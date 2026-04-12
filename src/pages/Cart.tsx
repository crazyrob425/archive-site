import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { productCatalog } from "../catalog-data.js";

interface CartItem {
  slug: string;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
    setMounted(true);
  }, []);

  const removeItem = (slug: string) => {
    const updated = cartItems.filter(item => item.slug !== slug);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
    toast.success("Cart cleared");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading cart...</p>
      </div>
    );
  }

  const items = cartItems
    .map(cartItem => {
      const product = productCatalog.find(p => p.slug === cartItem.slug);
      return product ? { ...cartItem, product } : null;
    })
    .filter(Boolean);

  const total = items.reduce((sum, item) => sum + (parseFloat(item!.product.price) * item!.quantity), 0);

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
          {items.length === 0 ? (
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
                  {items.map((item) => (
                    <div key={item!.slug} className="flex gap-4 p-4 bg-card border border-border rounded-lg">
                      <div className="w-24 h-32 bg-muted rounded overflow-hidden flex-shrink-0">
                        {item!.product.coverImageUrl && (
                          <img
                            src={item!.product.coverImageUrl}
                            alt={item!.product.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <Link href={`/product/${item!.product.slug}`} className="font-bold hover:text-accent transition-colors">
                          {item!.product.title}
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">{item!.product.category}</p>
                        <p className="text-accent font-semibold mb-2">${item!.product.price}</p>
                        <p className="text-sm">Qty: {item!.quantity}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item!.slug)}
                          className="text-destructive hover:opacity-80 transition-opacity"
                        >
                          <Trash2 size={20} />
                        </button>
                        <p className="font-bold">${(parseFloat(item!.product.price) * item!.quantity).toFixed(2)}</p>
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
                    onClick={clearCart}
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
