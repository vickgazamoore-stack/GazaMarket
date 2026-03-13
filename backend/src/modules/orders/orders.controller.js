import {
  createOrderForBuyer,
  getOrderForBuyer,
  listOrdersForBuyer,
  listOrdersForSeller,
  updateOrderStatusForSeller,
} from "./orders.service.js";

export const createOrder = async (req, res) => {
  const order = await createOrderForBuyer(req.user.id, req.body);

  res.status(201).json({
    success: true,
    order,
  });
};

export const getMyOrders = async (req, res) => {
  const orders = await listOrdersForBuyer(req.user.id);

  res.status(200).json({
    success: true,
    orders,
  });
};

export const getMyOrderById = async (req, res) => {
  const order = await getOrderForBuyer(req.user.id, req.params.orderId);

  res.status(200).json({
    success: true,
    order,
  });
};

export const getMySellerOrders = async (req, res) => {
  const orders = await listOrdersForSeller(req.user.id);

  res.status(200).json({
    success: true,
    orders,
  });
};

export const updateMySellerOrderStatus = async (req, res) => {
  const { status, trackingNumber } = req.body;
  const order = await updateOrderStatusForSeller(
    req.user.id,
    req.params.orderId,
    status,
    trackingNumber,
  );

  res.status(200).json({
    success: true,
    order,
  });
};
