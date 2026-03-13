import {
  createReturnForBuyer,
  listAllReturns,
  listReturnsForBuyer,
  listReturnsForSeller,
  updateReturnStatus,
} from "./returns.service.js";

export const createReturn = async (req, res) => {
  const returnRequest = await createReturnForBuyer(req.user.id, req.body);

  res.status(201).json({
    success: true,
    return: returnRequest,
  });
};

export const getMyReturns = async (req, res) => {
  const returns = await listReturnsForBuyer(req.user.id);

  res.status(200).json({
    success: true,
    returns,
  });
};

export const getMySellerReturns = async (req, res) => {
  const returns = await listReturnsForSeller(req.user.id);

  res.status(200).json({
    success: true,
    returns,
  });
};

export const getAllReturns = async (_req, res) => {
  const returns = await listAllReturns();

  res.status(200).json({
    success: true,
    returns,
  });
};

export const patchReturnStatus = async (req, res) => {
  const updated = await updateReturnStatus(req.params.returnId, req.body.status);

  res.status(200).json({
    success: true,
    return: updated,
  });
};
