import { z } from "zod";

const emptyObject = z.object({}).default({});

export const createConversationSchema = z.object({
  body: z.object({
    orderId: z.string().optional().default(""),
    buyerId: z.string().min(1),
    sellerId: z.string().min(1),
    buyerName: z.string().optional().default("Buyer"),
    sellerName: z.string().optional().default("Seller"),
    initialMessage: z.string().optional().default(""),
  }),
  params: emptyObject,
  query: emptyObject,
});

export const sendMessageSchema = z.object({
  body: z.object({
    text: z.string().min(1),
  }),
  params: z.object({
    conversationId: z.string().min(1),
  }),
  query: emptyObject,
});
