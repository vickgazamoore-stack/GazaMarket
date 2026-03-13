import { Dispute } from "../../models/dispute.model.js";
import { ApiError } from "../../utils/apiError.js";

const makeDisputeNumber = () => {
  return `DSP-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
};

const toResponse = (d) => ({
  id: d.disputeNumber,
  disputeId: d.disputeNumber,
  orderId: d.orderId,
  buyer: d.buyer,
  buyerEmail: d.buyerEmail,
  seller: d.seller,
  sellerId: d.sellerId,
  reason: d.reason,
  description: d.description,
  status: d.status,
  filed: d.filed,
  dateFiled: d.filed,
  amount: d.amount,
  evidence: d.evidence,
  sellerEvidence: d.sellerEvidence,
  messages: d.messages,
  updates: d.messages,
  resolution: d.resolution,
  lastUpdate: d.lastUpdate,
});

export const createDisputeForBuyer = async (buyer, payload) => {
  let disputeNumber = makeDisputeNumber();
  while (await Dispute.findOne({ disputeNumber })) {
    disputeNumber = makeDisputeNumber();
  }

  const now = new Date();
  const entry = await Dispute.create({
    disputeNumber,
    buyerId: buyer.id,
    sellerId: payload.sellerId,
    orderId: payload.orderId,
    buyer: buyer.name || "Buyer",
    buyerEmail: buyer.email || "",
    seller: payload.seller,
    reason: payload.reason,
    description: payload.description || "",
    status: "under_review",
    filed: now,
    amount: payload.amount || 0,
    evidence: payload.evidence || [],
    messages: [{ sender: "buyer", time: now, text: payload.description || payload.reason }],
    lastUpdate: now,
  });

  return toResponse(entry);
};

export const listDisputesForBuyer = async (buyerId) => {
  const list = await Dispute.find({ buyerId }).sort({ createdAt: -1 });
  return list.map(toResponse);
};

export const listDisputesForSeller = async (sellerId) => {
  const list = await Dispute.find({ sellerId }).sort({ createdAt: -1 });
  return list.map(toResponse);
};

export const listDisputesForAdmin = async () => {
  const list = await Dispute.find().sort({ createdAt: -1 });
  return list.map(toResponse);
};

export const addSellerResponse = async (sellerId, disputeId, response, evidence) => {
  const dispute = await Dispute.findOne({ disputeNumber: disputeId, sellerId });
  if (!dispute) throw new ApiError(404, "Dispute not found");

  const now = new Date();
  dispute.status = "under_review";
  dispute.sellerEvidence = evidence || [];
  dispute.messages = [...(dispute.messages || []), { sender: "seller", time: now, text: response }];
  dispute.lastUpdate = now;
  await dispute.save();

  return toResponse(dispute);
};

export const resolveDisputeByAdmin = async (disputeId, payload) => {
  const dispute = await Dispute.findOne({ disputeNumber: disputeId });
  if (!dispute) throw new ApiError(404, "Dispute not found");

  const now = new Date();
  dispute.status = "resolved";
  dispute.resolution = {
    decision: payload.decision,
    amount: payload.amount || 0,
    reason: payload.reason,
    dateResolved: now,
  };
  dispute.messages = [
    ...(dispute.messages || []),
    { sender: "admin", time: now, text: `Resolution: ${payload.decision}. ${payload.reason}` },
  ];
  dispute.lastUpdate = now;
  await dispute.save();

  return toResponse(dispute);
};
