export interface StripeCheckoutItem {
  slug: string;
  quantity: number;
}

interface StripeCheckoutOptions {
  customerEmail?: string;
  successPath?: string;
  cancelPath?: string;
}

function buildUrl(path: string, sessionIdPlaceholder = false) {
  const origin = window.location.origin;
  const base = path.startsWith("/") ? path : `/${path}`;
  const query = sessionIdPlaceholder ? "?session_id={CHECKOUT_SESSION_ID}" : "";
  return `${origin}${base}${query}`;
}

export async function redirectToStripeCheckout(
  items: StripeCheckoutItem[],
  options: StripeCheckoutOptions = {},
) {
  if (typeof window === "undefined") {
    throw new Error("Stripe checkout can only run in the browser.");
  }

  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items,
      customerEmail: options.customerEmail,
      successUrl: buildUrl(options.successPath || "/checkout/success", true),
      cancelUrl: buildUrl(options.cancelPath || "/cart"),
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Unable to start Stripe checkout.");
  }

  if (!data.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  window.location.assign(data.url);
}
