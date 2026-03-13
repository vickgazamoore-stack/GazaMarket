import { ReturnRequest } from "../../models/return.model.js";
import { ApiError } from "../../utils/apiError.js";

const makeReturnNumber = () => {
  return `RET-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
};

const toResponse = (entry) => ({
  id: entry.returnNumber,
  orderId: entry.orderId,
  sellerId: entry.sellerId,
  sellerName: entry.sellerName,
  reason: entry.reason,
  notes: entry.notes,
  status: entry.status,
  filed: entry.filed,
  createdAt: entry.createdAt,
  updatedAt: entry.updatedAt,
});

export const createReturnForBuyer = async (buyerId, payload) => {
  let returnNumber = makeReturnNumber();

  while (await ReturnRequest.findOne({ returnNumber })) {
    returnNumber = makeReturnNumber();
  }

  const entry = await ReturnRequest.create({
    returnNumber,
    buyerId,
    orderId: payload.orderId,
    sellerId: payload.sellerId,
    sellerName: payload.sellerName,
    reason: payload.reason,
    notes: payload.notes || "",
    status: "requested",
    filed: new Date(),
  });

  return toResponse(entry);
};

export const listReturnsForBuyer = async (buyerId) => {
  const list = await ReturnRequest.find({ buyerId }).sort({ createdAt: -1 });
  return list.map(toResponse);
};

export const listReturnsForSeller = async (sellerId) => {
  const list = await ReturnRequest.find({ sellerId }).sort({ createdAt: -1 });
  return list.map(toResponse);
};

export const listAllReturns = async () => {
  const list = await ReturnRequest.find().sort({ createdAt: -1 });
  return list.map(toResponse);
};

export const updateReturnStatus = async (returnId, status) => {
  const entry = await ReturnRequest.findOne({ returnNumber: returnId });

  if (!entry) {
    throw new ApiError(404, "Return request not found");
  }

  entry.status = status;
  await entry.save();

  return toResponse(entry);
};
