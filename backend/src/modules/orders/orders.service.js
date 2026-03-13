import { Order } from "../../models/order.model.js";
import { ApiError } from "../../utils/apiError.js";

const makeOrderNumber = () => {
  return `ORD-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
};

const normalizeItem = (item) => ({
  productId: item.productId || "",
  name: item.name,
  price: item.price,
  quantity: item.quantity,
  image: item.image ?? null,
});

const toResponse = (order) => {
  return {
    id: order.orderNumber,
    parentOrderId: order.parentOrderId,
    date: order.date,
    status: order.status,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
    buyer: order.buyer,
    shippingAddress: order.shippingAddress,
    payment: order.payment,
    sellers: order.sellers,
    items: order.items,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};

const toSellerOrderResponse = (order, seller) => ({
  orderNumber: order.orderNumber,
  buyer: order.buyer?.name || "Buyer",
  date: order.date,
  status: (seller.status || order.status || "Processing").toLowerCase(),
  total: (seller.subtotal || 0) + (seller.shippingCost || 0),
  product: seller.items?.map((item) => item.name).join(", ") || "Items",
  shippingAddress: order.shippingAddress,
  trackingNumber: seller.trackingNumber || "",
  sellerName: seller.sellerName,
  sellerId: seller.sellerId,
});

const deriveParentStatus = (sellers = []) => {
  const statuses = sellers.map((seller) => seller.status);
  if (statuses.length === 0) return "Processing";
  if (statuses.every((status) => status === "Delivered")) return "Delivered";
  if (statuses.some((status) => status === "Shipped")) return "Shipped";
  if (statuses.every((status) => status === "Cancelled")) return "Cancelled";
  return "Processing";
};

export const createOrderForBuyer = async (buyerId, payload) => {
  let orderNumber = makeOrderNumber();

  while (await Order.findOne({ orderNumber })) {
    orderNumber = makeOrderNumber();
  }

  const sellers = payload.sellers.map((seller) => ({
    sellerOrderId: `${orderNumber}-${seller.sellerId}`,
    sellerId: seller.sellerId,
    sellerName: seller.sellerName,
    status: "Processing",
    trackingNumber: null,
    items: seller.items.map(normalizeItem),
    subtotal: seller.subtotal,
    shippingCost: seller.shippingCost,
    deliveryEstimate: seller.deliveryEstimate || "3-5 days",
  }));

  const order = await Order.create({
    orderNumber,
    parentOrderId: orderNumber,
    buyerId,
    date: new Date(),
    status: "Processing",
    subtotal: payload.subtotal,
    shipping: payload.shipping,
    tax: payload.tax,
    total: payload.total,
    buyer: payload.buyer,
    shippingAddress: payload.shippingAddress,
    payment: payload.payment,
    sellers,
    items: payload.items.map(normalizeItem),
  });

  return toResponse(order);
};

export const listOrdersForBuyer = async (buyerId) => {
  const orders = await Order.find({ buyerId }).sort({ createdAt: -1 });
  return orders.map(toResponse);
};

export const getOrderForBuyer = async (buyerId, orderId) => {
  const order = await Order.findOne({ buyerId, orderNumber: orderId });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return toResponse(order);
};

export const listOrdersForSeller = async (sellerId) => {
  const orders = await Order.find({ "sellers.sellerId": sellerId }).sort({ createdAt: -1 });

  return orders.flatMap((order) => {
    const sellerRows = (order.sellers || []).filter((seller) => seller.sellerId === sellerId);
    return sellerRows.map((seller) => toSellerOrderResponse(order, seller));
  });
};

export const updateOrderStatusForSeller = async (sellerId, orderNumber, status, trackingNumber) => {
  const order = await Order.findOne({
    orderNumber,
    "sellers.sellerId": sellerId,
  });

  if (!order) {
    throw new ApiError(404, "Order not found for this seller");
  }

  const nextSellers = (order.sellers || []).map((seller) => {
    if (seller.sellerId !== sellerId) {
      return seller;
    }

    return {
      ...seller.toObject(),
      status,
      trackingNumber:
        trackingNumber !== undefined && trackingNumber !== null
          ? trackingNumber
          : seller.trackingNumber || "",
    };
  });

  order.sellers = nextSellers;
  order.status = deriveParentStatus(nextSellers);
  await order.save();

  const seller = nextSellers.find((entry) => entry.sellerId === sellerId);
  return toSellerOrderResponse(order, seller);
};
