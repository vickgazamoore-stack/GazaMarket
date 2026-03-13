import { Router } from "express";
import { authorize, requireAuth } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createDispute,
  getAllDisputes,
  getMyDisputes,
  getMySellerDisputes,
  resolveDispute,
  submitSellerResponse,
} from "./disputes.controller.js";
import {
  createDisputeSchema,
  resolveDisputeSchema,
  sellerResponseSchema,
} from "./disputes.validation.js";

const router = Router();

router.use(requireAuth);

router.post("/", authorize("buyer"), validate(createDisputeSchema), asyncHandler(createDispute));
router.get("/my", authorize("buyer"), asyncHandler(getMyDisputes));
router.get("/seller/my", authorize("seller"), asyncHandler(getMySellerDisputes));
router.get("/admin/all", authorize("admin"), asyncHandler(getAllDisputes));
router.patch(
  "/:disputeId/seller-response",
  authorize("seller"),
  validate(sellerResponseSchema),
  asyncHandler(submitSellerResponse),
);
router.patch(
  "/:disputeId/resolve",
  authorize("admin"),
  validate(resolveDisputeSchema),
  asyncHandler(resolveDispute),
);

export default router;
