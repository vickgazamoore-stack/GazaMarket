import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    productId: { type: String, default: "" },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { _id: false },
);

const sellerOrderSchema = new mongoose.Schema(
  {
    sellerOrderId: { type: String, required: true, trim: true },
    sellerId: { type: String, required: true, trim: true },
    sellerName: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    trackingNumber: { type: String, default: null },
    items: { type: [itemSchema], default: [] },
    subtotal: { type: Number, required: true, min: 0 },
    shippingCost: { type: Number, required: true, min: 0 },
    deliveryEstimate: { type: String, default: "3-5 days" },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    parentOrderId: {
      type: String,
      required: true,
      trim: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    subtotal: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    buyer: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: String, default: "" },
    },
    shippingAddress: { type: String, required: true, trim: true },
    payment: {
      method: { type: String, default: "card" },
      last4: { type: String, default: "" },
      cardName: { type: String, default: "" },
    },
    sellers: { type: [sellerOrderSchema], default: [] },
    items: { type: [itemSchema], default: [] },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
