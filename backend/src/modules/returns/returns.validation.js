import { z } from "zod";

const emptyObject = z.object({}).default({});

export const createReturnSchema = z.object({
  body: z.object({
    orderId: z.string().min(1),
    sellerId: z.string().min(1),
    sellerName: z.string().min(1),
    reason: z.string().min(2).max(200),
    notes: z.string().max(2000).optional().default(""),
  }),
  params: emptyObject,
  query: emptyObject,
});

export const updateReturnStatusSchema = z.object({
  body: z.object({
    status: z.enum(["requested", "approved", "rejected"]),
  }),
  params: z.object({
    returnId: z.string().min(1),
  }),
  query: emptyObject,
});
