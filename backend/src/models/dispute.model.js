import mongoose from "mongoose";

const disputeMessageSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ["buyer", "seller", "admin"], required: true },
    time: { type: Date, default: Date.now },
    text: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const resolutionSchema = new mongoose.Schema(
  {
    decision: { type: String, default: "" },
    amount: { type: Number, default: 0 },
    reason: { type: String, default: "" },
    dateResolved: { type: Date },
  },
  { _id: false },
);

const disputeSchema = new mongoose.Schema(
  {
    disputeNumber: { type: String, required: true, unique: true, index: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    sellerId: { type: String, required: true, index: true },
    orderId: { type: String, required: true, index: true },
    buyer: { type: String, required: true },
    buyerEmail: { type: String, default: "" },
    seller: { type: String, required: true },
    reason: { type: String, required: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["open", "under_review", "resolved", "closed"],
      default: "open",
      index: true,
    },
    filed: { type: Date, default: Date.now },
    amount: { type: Number, default: 0 },
    evidence: { type: [String], default: [] },
    sellerEvidence: { type: [String], default: [] },
    messages: { type: [disputeMessageSchema], default: [] },
    resolution: { type: resolutionSchema, default: null },
    lastUpdate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Dispute = mongoose.model("Dispute", disputeSchema);
