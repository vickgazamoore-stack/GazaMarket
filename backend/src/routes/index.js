import { Router } from "express";
import healthRoutes from "../modules/health/health.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import ordersRoutes from "../modules/orders/orders.routes.js";
import returnsRoutes from "../modules/returns/returns.routes.js";
import disputesRoutes from "../modules/disputes/disputes.routes.js";
import messagesRoutes from "../modules/messages/messages.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/orders", ordersRoutes);
router.use("/returns", returnsRoutes);
router.use("/disputes", disputesRoutes);
router.use("/messages", messagesRoutes);

export default router;
