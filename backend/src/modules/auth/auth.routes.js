import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validate } from "../../middlewares/validate.js";
import { authorize, requireAuth } from "../../middlewares/auth.js";
import { listUsers, login, logout, me, patchUserStatus, register } from "./auth.controller.js";
import {
  loginSchema,
  patchUserStatusSchema,
  registerSchema,
} from "./auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));
router.post("/logout", asyncHandler(logout));
router.get("/me", requireAuth, asyncHandler(me));

// Optional admin route for quick verification during development.
router.get("/users", requireAuth, authorize("admin"), asyncHandler(listUsers));
router.patch(
  "/users/:userId/status",
  requireAuth,
  authorize("admin"),
  validate(patchUserStatusSchema),
  asyncHandler(patchUserStatus),
);

export default router;
