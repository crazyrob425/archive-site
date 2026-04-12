import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

export default function Cart() {
  const { isAuthenticated } = useAuth();
  const { data: cartItems, isLoading, refetch } = trpc.cart.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const removeItem = trpc.cart.remove.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Removed from cart");
    },
  });

  const clearCart = trpc.cart.clear.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Cart cleared");
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container py-24 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Sign in to view your cart</h1>
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

  const total = cartItems?.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0) || 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-12">
        <div className="container">
          <h1 className="text-5xl font-bold">Shopping Cart</h1>
        </div>
      </div>

      {/* Cart Content */}
      <div className="section-spacing">
        <div className="container">
          {!cartItems || cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <Link href="/shop" className="btn-primary inline-block">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-card border border-border rounded-lg">
                      <div className="w-24 h-32 bg-muted rounded overflow-hidden flex-shrink-0">
                        {item.product.coverImageUrl && (
                          <img
                            src={item.product.coverImageUrl}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <Link href={`/product/${item.product.slug}`} className="font-bold hover:text-accent transition-colors">
                          {item.product.title}
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">{item.product.category}</p>
                        <p className="text-accent font-semibold mb-2">${item.product.price}</p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem.mutate({ cartItemId: item.id })}
                          disabled={removeItem.isPending}
                          className="text-destructive hover:opacity-80 transition-opacity"
                        >
                          <Trash2 size={20} />
                        </button>
                        <p className="font-bold">${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
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
                    onClick={() => window.location.href = "/checkout"}
                    className="w-full btn-primary mb-4"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => clearCart.mutate()}
                    disabled={clearCart.isPending}
                    className="w-full btn-ghost"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
