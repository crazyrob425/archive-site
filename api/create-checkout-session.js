import Stripe from "stripe";
import { productCatalog } from "../src/catalog-data.js";

function sendJson(res, statusCode, payload) {
  res.status(statusCode).json(payload);
}

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey.includes("your-") || secretKey.includes("placeholder")) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return new Stripe(secretKey, {
    apiVersion: "2024-06-20",
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  try {
    const { items, successUrl, cancelUrl, customerEmail } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return sendJson(res, 400, { error: "No cart items were provided." });
    }

    if (typeof successUrl !== "string" || typeof cancelUrl !== "string") {
      return sendJson(res, 400, { error: "Checkout URLs are required." });
    }

    const stripe = getStripe();

    const lineItems = items.map((item) => {
      const product = productCatalog.find((entry) => entry.slug === item.slug);

      if (!product) {
        throw new Error(`Product not found: ${item.slug}`);
      }

      const quantity = Math.max(1, Number(item.quantity) || 1);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: product.description,
            images: product.coverImageUrl ? [product.coverImageUrl] : [],
          },
          unit_amount: Math.round(Number(product.price) * 100),
        },
        quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: typeof customerEmail === "string" && customerEmail.includes("@") ? customerEmail : undefined,
      metadata: {
        store: "archive-site",
        source: "digital-bookstore",
      },
    });

    return sendJson(res, 200, {
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout session creation failed:", error);
    return sendJson(res, 500, {
      error: error instanceof Error ? error.message : "Failed to create checkout session.",
    });
  }
}
