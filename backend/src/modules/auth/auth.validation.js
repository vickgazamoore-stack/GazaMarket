import { z } from "zod";

const emptyObject = z.object({}).default({});

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email(),
    password: z.string().min(8).max(72),
    role: z.enum(["buyer", "seller"]).optional().default("buyer"),
  }),
  params: emptyObject,
  query: emptyObject,
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email(),
    password: z.string().min(8).max(72),
  }),
  params: emptyObject,
  query: emptyObject,
});

export const patchUserStatusSchema = z.object({
  body: z.object({
    isActive: z.boolean(),
  }),
  params: z.object({
    userId: z.string().min(1),
  }),
  query: emptyObject,
});
