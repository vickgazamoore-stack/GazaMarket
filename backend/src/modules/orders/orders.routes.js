import { Router } from "express";
import { requireAuth, authorize } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createOrder,
  getMyOrderById,
  getMyOrders,
  getMySellerOrders,
  updateMySellerOrderStatus,
} from "./orders.controller.js";
import {
  createOrderSchema,
  orderIdParamSchema,
  updateSellerOrderStatusSchema,
} from "./orders.validation.js";

const router = Router();

router.use(requireAuth);

router.get("/my", authorize("buyer"), asyncHandler(getMyOrders));
router.get("/seller/my", authorize("seller"), asyncHandler(getMySellerOrders));
router.patch(
  "/seller/:orderId/status",
  authorize("seller"),
  validate(updateSellerOrderStatusSchema),
  asyncHandler(updateMySellerOrderStatus),
);
router.get("/:orderId", authorize("buyer"), validate(orderIdParamSchema), asyncHandler(getMyOrderById));
router.post("/", authorize("buyer"), validate(createOrderSchema), asyncHandler(createOrder));

export default router;
