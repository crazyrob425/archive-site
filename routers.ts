import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    list: publicProcedure
      .input(z.object({
        category: z.string().optional(),
        search: z.string().optional(),
        featured: z.boolean().optional(),
      }))
      .query(async ({ input }) => {
        return await db.getProducts(input);
      }),

    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getProductBySlug(input.slug);
      }),

    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getProductById(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        category: z.enum(["lost-hobbies", "industrial-secrets", "technical-manuals", "software-collections"]),
        price: z.string(),
        coverImageUrl: z.string().optional(),
        featured: z.boolean().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return await db.createProduct(input);
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        data: z.any(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return await db.updateProduct(input.id, input.data);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return await db.deleteProduct(input.id);
      }),
  }),

  cart: router({
    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getCartItems(ctx.user!.id);
      }),

    add: protectedProcedure
      .input(z.object({
        productId: z.number(),
        quantity: z.number().default(1),
      }))
      .mutation(async ({ input, ctx }) => {
        return await db.addToCart(ctx.user!.id, input.productId, input.quantity);
      }),

    remove: protectedProcedure
      .input(z.object({ cartItemId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        return await db.removeFromCart(ctx.user!.id, input.cartItemId);
      }),

    clear: protectedProcedure
      .mutation(async ({ ctx }) => {
        return await db.clearCart(ctx.user!.id);
      }),
  }),

  orders: router({
    list: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUserOrders(ctx.user!.id);
      }),

    byId: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        const order = await db.getOrderById(input.id);
        if (order?.userId !== ctx.user!.id && ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return order;
      }),

    items: publicProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input }) => {
        return await db.getOrderItems(input.orderId);
      }),

    create: protectedProcedure
      .input(z.object({
        items: z.array(z.object({
          productId: z.number(),
          title: z.string(),
          price: z.string(),
          quantity: z.number(),
        })),
        totalAmount: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await db.createOrder({
          userId: ctx.user!.id,
          status: "pending",
          totalAmount: input.totalAmount,
          items: input.items,
          customerEmail: ctx.user!.email,
        });
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        orderId: z.number(),
        status: z.enum(["pending", "completed", "failed", "refunded"]),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return await db.updateOrderStatus(input.orderId, input.status);
      }),
  }),

  serviceBureau: router({
    list: protectedProcedure
      .input(z.object({ status: z.string().optional() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return await db.getServiceBureauRequests(input);
      }),

    byId: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        const request = await db.getServiceBureauRequestById(input.id);
        if (request?.userId !== ctx.user!.id && ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }
        return request;
      }),

    create: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        projectTitle: z.string(),
        description: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const request = await db.createServiceBureauRequest({
          userId: ctx.user?.id,
          ...input,
          status: "new",
        });
        
        if (request && typeof request === 'object' && 'id' in request) {
          const { notifyOwnerOfServiceBureauRequest } = await import("./serviceBureau");
          notifyOwnerOfServiceBureauRequest(request as any).catch(err => 
            console.error("Failed to notify owner:", err)
          );
        }
        
        return request;
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        data: z.any(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return await db.updateServiceBureauRequest(input.id, input.data);
      }),
  }),

  checkout: router({
    createSession: protectedProcedure
      .input(z.object({
        cartItems: z.array(z.object({
          productId: z.number(),
          quantity: z.number(),
        })),
        successUrl: z.string(),
        cancelUrl: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        
        // Get product details for line items
        const lineItems = await Promise.all(
          input.cartItems.map(async (item) => {
            const product = await db.getProductById(item.productId);
            if (!product) throw new Error(`Product ${item.productId} not found`);
            
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: product.title,
                  description: product.description,
                  images: product.coverImageUrl ? [product.coverImageUrl] : [],
                },
                unit_amount: Math.round(parseFloat(product.price) * 100),
              },
              quantity: item.quantity,
            };
          })
        );

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: lineItems,
          mode: 'payment',
          success_url: input.successUrl,
          cancel_url: input.cancelUrl,
          customer_email: ctx.user.email,
          metadata: {
            userId: ctx.user.id,
          },
        });

        return { sessionId: session.id, url: session.url };
      }),
  }),
});

export type AppRouter = typeof appRouter;
