import mongoose from "mongoose";

const returnSchema = new mongoose.Schema(
  {
    returnNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    orderId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    sellerId: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    sellerName: {
      type: String,
      required: true,
      trim: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["requested", "approved", "rejected"],
      default: "requested",
      index: true,
    },
    filed: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true },
);

export const ReturnRequest = mongoose.model("ReturnRequest", returnSchema);
