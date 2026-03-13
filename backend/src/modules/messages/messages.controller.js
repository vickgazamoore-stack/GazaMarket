import { appendMessage, createConversation, listConversationsForUser } from "./messages.service.js";

export const createConversationEntry = async (req, res) => {
  const conversation = await createConversation(req.body, req.user.role);
  res.status(201).json({ success: true, conversation });
};

export const getMyConversations = async (req, res) => {
  const conversations = await listConversationsForUser(req.user);
  res.status(200).json({ success: true, conversations });
};

export const sendMessage = async (req, res) => {
  const conversation = await appendMessage(req.params.conversationId, req.user, req.body.text);
  res.status(200).json({ success: true, conversation });
};
