import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    sender: { type: String, enum: ["buyer", "seller", "admin"], required: true },
    text: { type: String, required: true, trim: true },
    time: { type: Date, default: Date.now },
  },
  { _id: false },
);

const conversationSchema = new mongoose.Schema(
  {
    conversationId: { type: String, required: true, unique: true, index: true },
    orderId: { type: String, default: "" },
    buyerId: { type: String, required: true, index: true },
    sellerId: { type: String, required: true, index: true },
    buyerName: { type: String, default: "Buyer" },
    sellerName: { type: String, default: "Seller" },
    participantType: { type: String, enum: ["seller", "buyer"], default: "seller" },
    lastMessage: { type: String, default: "" },
    lastMessageTime: { type: Date, default: Date.now },
    messages: { type: [messageSchema], default: [] },
  },
  { timestamps: true },
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
