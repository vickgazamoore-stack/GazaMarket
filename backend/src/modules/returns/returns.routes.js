import { Router } from "express";
import { authorize, requireAuth } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createReturn,
  getAllReturns,
  getMyReturns,
  getMySellerReturns,
  patchReturnStatus,
} from "./returns.controller.js";
import { createReturnSchema, updateReturnStatusSchema } from "./returns.validation.js";

const router = Router();

router.use(requireAuth);

router.post("/", authorize("buyer"), validate(createReturnSchema), asyncHandler(createReturn));
router.get("/my", authorize("buyer"), asyncHandler(getMyReturns));
router.get("/seller/my", authorize("seller"), asyncHandler(getMySellerReturns));
router.get("/admin/all", authorize("admin"), asyncHandler(getAllReturns));
router.patch(
  "/:returnId/status",
  authorize("seller", "admin"),
  validate(updateReturnStatusSchema),
  asyncHandler(patchReturnStatus),
);

export default router;
