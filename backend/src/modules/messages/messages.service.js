import { Conversation } from "../../models/conversation.model.js";
import { ApiError } from "../../utils/apiError.js";

const makeConversationId = () => {
  return `CONV-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
};

const toResponse = (conv) => ({
  id: conv.conversationId,
  orderId: conv.orderId,
  buyerId: conv.buyerId,
  sellerId: conv.sellerId,
  buyerName: conv.buyerName,
  participantName: conv.sellerName,
  sellerName: conv.sellerName,
  lastMessage: conv.lastMessage,
  lastMessageTime: conv.lastMessageTime,
  messages: conv.messages,
});

export const createConversation = async (payload, senderRole) => {
  let conversationId = makeConversationId();
  while (await Conversation.findOne({ conversationId })) {
    conversationId = makeConversationId();
  }

  const now = new Date();
  const initialText = payload.initialMessage || (senderRole === "seller" ? "Hi! How can I help?" : "Hi! I have a question.");
  const initialSender = senderRole === "seller" ? "seller" : "buyer";

  const conv = await Conversation.create({
    conversationId,
    orderId: payload.orderId || "",
    buyerId: payload.buyerId,
    sellerId: payload.sellerId,
    buyerName: payload.buyerName || "Buyer",
    sellerName: payload.sellerName || "Seller",
    participantType: "seller",
    lastMessage: initialText,
    lastMessageTime: now,
    messages: [{ id: 1, sender: initialSender, text: initialText, time: now }],
  });

  return toResponse(conv);
};

export const listConversationsForUser = async (user) => {
  const isSeller = user.role === "seller";
  const query = isSeller ? { sellerId: user.id } : { buyerId: user.id };
  const list = await Conversation.find(query).sort({ lastMessageTime: -1 });
  return list.map(toResponse);
};

export const appendMessage = async (conversationId, user, text) => {
  const conv = await Conversation.findOne({ conversationId });
  if (!conv) throw new ApiError(404, "Conversation not found");

  const isParticipant =
    user.role === "admin" ||
    conv.buyerId === user.id ||
    conv.sellerId === user.id;

  if (!isParticipant) {
    throw new ApiError(403, "You cannot send messages to this conversation");
  }

  const sender = user.role === "seller" ? "seller" : user.role === "admin" ? "admin" : "buyer";
  const nextId = (conv.messages?.length || 0) + 1;
  const now = new Date();
  conv.messages = [...(conv.messages || []), { id: nextId, sender, text, time: now }];
  conv.lastMessage = text;
  conv.lastMessageTime = now;
  await conv.save();

  return toResponse(conv);
};
