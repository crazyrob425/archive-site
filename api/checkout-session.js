import Stripe from "stripe";

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
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  try {
    const { session_id: sessionId } = req.query || {};

    if (typeof sessionId !== "string" || !sessionId) {
      return sendJson(res, 400, { error: "A valid Stripe session_id is required." });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    const items = (session.line_items?.data || []).map((item) => ({
      title: item.description || item.price?.product_data?.name || "Digital product",
      quantity: item.quantity || 1,
      amountTotal: item.amount_total || Math.round((item.amount_subtotal || 0) * (item.quantity || 1)),
      description: item.description || null,
    }));

    return sendJson(res, 200, {
      id: session.id,
      customerEmail: session.customer_details?.email || session.customer_email || null,
      amountTotal: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status,
      items,
    });
  } catch (error) {
    console.error("Stripe checkout session lookup failed:", error);
    return sendJson(res, 500, {
      error: error instanceof Error ? error.message : "Failed to load checkout session.",
    });
  }
}
