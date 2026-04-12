import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { CheckCircle2, Loader2, Sparkles, Package } from "lucide-react";

interface CheckoutLineItem {
  title: string;
  quantity: number;
  amountTotal: number;
  description?: string | null;
}

interface CheckoutSessionDetails {
  id: string;
  customerEmail: string | null;
  amountTotal: number | null;
  currency: string | null;
  paymentStatus: string;
  items: CheckoutLineItem[];
}

export default function CheckoutSuccess() {
  const sessionId = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("session_id");
  }, []);

  const [session, setSession] = useState<CheckoutSessionDetails | null>(null);
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const loadSession = async () => {
      try {
        const response = await fetch(`/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`);
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.error || "Unable to load checkout confirmation.");
        }

        setSession(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load checkout confirmation.");
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="section-spacing">
        <div className="container max-w-3xl">
          <div className="card space-y-8">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-green-500/15 p-3 text-green-400">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-accent font-semibold mb-2">Payment complete</p>
                <h1 className="text-4xl font-bold mb-3">Thanks for your purchase</h1>
                <p className="text-muted-foreground leading-relaxed">
                  Your Stripe payment has been processed successfully. Your digital receipt will be sent to the email address used at checkout.
                </p>
              </div>
            </div>

            {loading && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="animate-spin" size={18} />
                <span>Loading order details…</span>
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                {error}
              </div>
            )}

            {session && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-border bg-background/60 p-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Session</p>
                    <p className="font-semibold break-all">{session.id}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-background/60 p-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                    <p className="font-semibold break-all">{session.customerEmail || "Stripe receipt email"}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-background/60 p-4">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                    <p className="font-semibold text-green-400 capitalize">{session.paymentStatus || "paid"}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Package size={22} className="text-accent" />
                    Purchased items
                  </h2>
                  <div className="space-y-3">
                    {session.items.map((item, index) => (
                      <div key={`${item.title}-${index}`} className="rounded-lg border border-border bg-background/60 p-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-accent font-semibold">
                          ${(item.amountTotal / 100).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-accent/30 bg-accent/10 p-5">
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-accent mt-1" size={20} />
                    <div>
                      <h3 className="font-bold mb-2">How delivery works</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Your digital products are delivered instantly through Stripe’s secure checkout flow. If you need access to a past purchase, check the receipt email first and then return here for support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/shop" className="btn-primary inline-flex justify-center">
                Continue Shopping
              </Link>
              <Link href="/cart" className="btn-secondary inline-flex justify-center">
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
