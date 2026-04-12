import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

declare global {
  interface Window {
    Stripe: any;
  }
}

export default function Checkout() {
  const { isAuthenticated } = useAuth();
  const { data: cartItems, isLoading } = trpc.cart.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cartItems?.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0) || 0;

  const handleCheckout = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      const items = cartItems.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          totalAmount: total.toFixed(2),
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      const { sessionId } = await response.json();

      if (window.Stripe) {
        const stripe = window.Stripe(process.env.VITE_STRIPE_PUBLIC_KEY);
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container py-24 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Sign in to checkout</h1>
          <a href={getLoginUrl()} className="btn-primary inline-block">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container py-24 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <p className="text-muted-foreground mb-6">Your cart is empty</p>
          <Link href="/shop" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50 py-12">
        <div className="container">
          <h1 className="text-5xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="section-spacing">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between pb-4 border-b border-border">
                      <div>
                        <p className="font-bold">{item.product.title}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Total</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-accent">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing && <Loader2 className="animate-spin" size={20} />}
                  {isProcessing ? "Processing..." : "Pay with Stripe"}
                </button>
                <Link href="/cart" className="block text-center mt-4 btn-ghost">
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
