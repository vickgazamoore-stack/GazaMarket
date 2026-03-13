import request from "supertest";
import mongoose from "mongoose";
import { beforeAll, afterAll, beforeEach, describe, expect, it } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../src/app.js";
import { User } from "../src/models/user.model.js";
import { signAccessToken } from "../src/utils/token.js";

let mongoServer;

const registerAndGetToken = async ({ role, email }) => {
  const response = await request(app).post("/api/v1/auth/register").send({
    name: role === "buyer" ? "Buyer User" : "Seller User",
    email,
    password: "password123",
    role,
  });

  expect(response.status).toBe(201);
  return { token: response.body.token, user: response.body.user };
};

const createAdminToken = async () => {
  const admin = await User.create({
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
  });

  return { admin, token: signAccessToken(admin._id.toString()) };
};

const createOrderPayload = (sellerId) => ({
  subtotal: 100,
  shipping: 10,
  tax: 8,
  total: 118,
  buyer: {
    name: "Buyer User",
    email: "buyer@example.com",
    phone: "1234567890",
  },
  shippingAddress: "12 Test Street, Lagos",
  payment: {
    method: "card",
    last4: "4242",
    cardName: "Buyer User",
  },
  sellers: [
    {
      sellerId,
      sellerName: "Seller Store",
      items: [{ productId: "P-1", name: "Test Product", price: 100, quantity: 1 }],
      subtotal: 100,
      shippingCost: 10,
      deliveryEstimate: "3-5 days",
    },
  ],
  items: [{ productId: "P-1", name: "Test Product", price: 100, quantity: 1 }],
});

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      launchTimeout: 60000,
    },
  });
  await mongoose.connect(mongoServer.getUri());
}, 120000);

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
  }
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  await Promise.all(Object.values(collections).map((collection) => collection.deleteMany({})));
});

describe("Auth", () => {
  it("registers, logs in, and returns current user", async () => {
    const registerRes = await request(app).post("/api/v1/auth/register").send({
      name: "Jane Buyer",
      email: "jane@example.com",
      password: "password123",
      role: "buyer",
    });

    expect(registerRes.status).toBe(201);
    expect(registerRes.body.user.email).toBe("jane@example.com");

    const loginRes = await request(app).post("/api/v1/auth/login").send({
      email: "jane@example.com",
      password: "password123",
    });

    expect(loginRes.status).toBe(200);
    const token = loginRes.body.token;
    expect(token).toBeTruthy();

    const meRes = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body.user.email).toBe("jane@example.com");
  });
});

describe("Orders + permissions", () => {
  it("allows buyer to create order and seller to list/update seller order", async () => {
    const { token: buyerToken, user: buyerUser } = await registerAndGetToken({
      role: "buyer",
      email: "buyer@example.com",
    });
    const { token: sellerToken, user: sellerUser } = await registerAndGetToken({
      role: "seller",
      email: "seller@example.com",
    });

    const createOrderRes = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${buyerToken}`)
      .send(createOrderPayload(sellerUser.id));

    expect(createOrderRes.status).toBe(201);
    const orderId = createOrderRes.body.order.id;

    const sellerCreateRes = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${sellerToken}`)
      .send(createOrderPayload(sellerUser.id));

    expect(sellerCreateRes.status).toBe(403);

    const buyerOrdersRes = await request(app)
      .get("/api/v1/orders/my")
      .set("Authorization", `Bearer ${buyerToken}`);
    expect(buyerOrdersRes.status).toBe(200);
    expect(buyerOrdersRes.body.orders).toHaveLength(1);
    expect(buyerOrdersRes.body.orders[0].buyer.email).toBe(buyerUser.email);

    const sellerOrdersRes = await request(app)
      .get("/api/v1/orders/seller/my")
      .set("Authorization", `Bearer ${sellerToken}`);
    expect(sellerOrdersRes.status).toBe(200);
    expect(sellerOrdersRes.body.orders).toHaveLength(1);

    const patchStatusRes = await request(app)
      .patch(`/api/v1/orders/seller/${orderId}/status`)
      .set("Authorization", `Bearer ${sellerToken}`)
      .send({ status: "Shipped", trackingNumber: "TRK123" });

    expect(patchStatusRes.status).toBe(200);
    expect(patchStatusRes.body.order.status).toBe("shipped");
  });
});

describe("Returns + disputes + messages", () => {
  it("handles buyer/seller/admin flows and permission failures", async () => {
    const { token: buyerToken, user: buyerUser } = await registerAndGetToken({
      role: "buyer",
      email: "buyer2@example.com",
    });
    const { token: sellerToken, user: sellerUser } = await registerAndGetToken({
      role: "seller",
      email: "seller2@example.com",
    });
    const { token: otherSellerToken } = await registerAndGetToken({
      role: "seller",
      email: "other-seller@example.com",
    });
    const { token: adminToken } = await createAdminToken();

    const orderRes = await request(app)
      .post("/api/v1/orders")
      .set("Authorization", `Bearer ${buyerToken}`)
      .send(createOrderPayload(sellerUser.id));
    const orderId = orderRes.body.order.id;

    const createReturnRes = await request(app)
      .post("/api/v1/returns")
      .set("Authorization", `Bearer ${buyerToken}`)
      .send({
        orderId,
        sellerId: sellerUser.id,
        sellerName: sellerUser.name,
        reason: "Item damaged",
        notes: "Screen cracked",
      });
    expect(createReturnRes.status).toBe(201);

    const sellerReturnsRes = await request(app)
      .get("/api/v1/returns/seller/my")
      .set("Authorization", `Bearer ${sellerToken}`);
    expect(sellerReturnsRes.status).toBe(200);
    expect(sellerReturnsRes.body.returns).toHaveLength(1);

    const returnId = createReturnRes.body.return.id;
    const updateReturnRes = await request(app)
      .patch(`/api/v1/returns/${returnId}/status`)
      .set("Authorization", `Bearer ${sellerToken}`)
      .send({ status: "approved" });
    expect(updateReturnRes.status).toBe(200);
    expect(updateReturnRes.body.return.status).toBe("approved");

    const adminReturnsRes = await request(app)
      .get("/api/v1/returns/admin/all")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(adminReturnsRes.status).toBe(200);
    expect(adminReturnsRes.body.returns).toHaveLength(1);

    const createDisputeRes = await request(app)
      .post("/api/v1/disputes")
      .set("Authorization", `Bearer ${buyerToken}`)
      .send({
        orderId,
        sellerId: sellerUser.id,
        seller: sellerUser.name,
        reason: "Not as described",
        description: "Specs mismatch",
        amount: 118,
        evidence: ["evidence1.jpg"],
      });
    expect(createDisputeRes.status).toBe(201);

    const disputeId = createDisputeRes.body.dispute.disputeId;
    const sellerResponseRes = await request(app)
      .patch(`/api/v1/disputes/${disputeId}/seller-response`)
      .set("Authorization", `Bearer ${sellerToken}`)
      .send({ response: "We can replace it", evidence: ["proof.pdf"] });
    expect(sellerResponseRes.status).toBe(200);

    const resolveRes = await request(app)
      .patch(`/api/v1/disputes/${disputeId}/resolve`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ decision: "partial_refund", amount: 50, reason: "Compromise" });
    expect(resolveRes.status).toBe(200);
    expect(resolveRes.body.dispute.status).toBe("resolved");

    const createConversationRes = await request(app)
      .post("/api/v1/messages")
      .set("Authorization", `Bearer ${buyerToken}`)
      .send({
        orderId,
        buyerId: buyerUser.id,
        sellerId: sellerUser.id,
        buyerName: buyerUser.name,
        sellerName: sellerUser.name,
        initialMessage: "Hello seller",
      });
    expect(createConversationRes.status).toBe(201);
    const conversationId = createConversationRes.body.conversation.id;

    const sellerSendRes = await request(app)
      .post(`/api/v1/messages/${conversationId}/messages`)
      .set("Authorization", `Bearer ${sellerToken}`)
      .send({ text: "Hello buyer" });
    expect(sellerSendRes.status).toBe(200);

    const outsiderSendRes = await request(app)
      .post(`/api/v1/messages/${conversationId}/messages`)
      .set("Authorization", `Bearer ${otherSellerToken}`)
      .send({ text: "Intruding message" });
    expect(outsiderSendRes.status).toBe(403);
  });
});
