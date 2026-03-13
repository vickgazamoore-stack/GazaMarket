import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createConversationEntry, getMyConversations, sendMessage } from "./messages.controller.js";
import { createConversationSchema, sendMessageSchema } from "./messages.validation.js";

const router = Router();

router.use(requireAuth);

router.get("/my", asyncHandler(getMyConversations));
router.post("/", validate(createConversationSchema), asyncHandler(createConversationEntry));
router.post("/:conversationId/messages", validate(sendMessageSchema), asyncHandler(sendMessage));

export default router;
