import { z } from "zod";

const emptyObject = z.object({}).default({});

export const createDisputeSchema = z.object({
  body: z.object({
    orderId: z.string().min(1),
    sellerId: z.string().min(1),
    seller: z.string().min(1),
    reason: z.string().min(2),
    description: z.string().optional().default(""),
    amount: z.number().nonnegative().optional().default(0),
    evidence: z.array(z.string()).optional().default([]),
  }),
  params: emptyObject,
  query: emptyObject,
});

export const disputeIdParamSchema = z.object({
  body: emptyObject,
  params: z.object({ disputeId: z.string().min(1) }),
  query: emptyObject,
});

export const sellerResponseSchema = z.object({
  body: z.object({
    response: z.string().min(2),
    evidence: z.array(z.string()).optional().default([]),
  }),
  params: z.object({ disputeId: z.string().min(1) }),
  query: emptyObject,
});

export const resolveDisputeSchema = z.object({
  body: z.object({
    decision: z.string().min(2),
    amount: z.number().nonnegative().optional().default(0),
    reason: z.string().min(2),
  }),
  params: z.object({ disputeId: z.string().min(1) }),
  query: emptyObject,
});
