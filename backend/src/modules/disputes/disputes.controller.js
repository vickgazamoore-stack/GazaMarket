import {
  addSellerResponse,
  createDisputeForBuyer,
  listDisputesForAdmin,
  listDisputesForBuyer,
  listDisputesForSeller,
  resolveDisputeByAdmin,
} from "./disputes.service.js";

export const createDispute = async (req, res) => {
  const dispute = await createDisputeForBuyer(req.user, req.body);
  res.status(201).json({ success: true, dispute });
};

export const getMyDisputes = async (req, res) => {
  const disputes = await listDisputesForBuyer(req.user.id);
  res.status(200).json({ success: true, disputes });
};

export const getMySellerDisputes = async (req, res) => {
  const disputes = await listDisputesForSeller(req.user.id);
  res.status(200).json({ success: true, disputes });
};

export const getAllDisputes = async (_req, res) => {
  const disputes = await listDisputesForAdmin();
  res.status(200).json({ success: true, disputes });
};

export const submitSellerResponse = async (req, res) => {
  const dispute = await addSellerResponse(
    req.user.id,
    req.params.disputeId,
    req.body.response,
    req.body.evidence || [],
  );
  res.status(200).json({ success: true, dispute });
};

export const resolveDispute = async (req, res) => {
  const dispute = await resolveDisputeByAdmin(req.params.disputeId, req.body);
  res.status(200).json({ success: true, dispute });
};
