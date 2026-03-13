import { z } from "zod";

const emptyObject = z.object({}).default({});

const itemSchema = z.object({
  productId: z.string().optional().default(""),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  image: z.any().optional(),
});

const sellerSchema = z.object({
  sellerId: z.string().min(1),
  sellerName: z.string().min(1),
  items: z.array(itemSchema).min(1),
  subtotal: z.number().nonnegative(),
  shippingCost: z.number().nonnegative(),
  deliveryEstimate: z.string().optional().default("3-5 days"),
});

export const createOrderSchema = z.object({
  body: z.object({
    subtotal: z.number().nonnegative(),
    shipping: z.number().nonnegative(),
    tax: z.number().nonnegative(),
    total: z.number().nonnegative(),
    buyer: z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional().default(""),
    }),
    shippingAddress: z.string().min(5),
    payment: z.object({
      method: z.string().optional().default("card"),
      last4: z.string().min(4).max(4),
      cardName: z.string().optional().default(""),
    }),
    sellers: z.array(sellerSchema).min(1),
    items: z.array(itemSchema).min(1),
  }),
  params: emptyObject,
  query: emptyObject,
});

export const orderIdParamSchema = z.object({
  body: emptyObject,
  params: z.object({
    orderId: z.string().min(1),
  }),
  query: emptyObject,
});

export const updateSellerOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["Processing", "Shipped", "Delivered", "Cancelled"]),
    trackingNumber: z.string().optional().nullable(),
  }),
  params: z.object({
    orderId: z.string().min(1),
  }),
  query: emptyObject,
});
