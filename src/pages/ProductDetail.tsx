import { useParams, Link } from "wouter";
import { ShoppingCart, ChevronLeft, Star, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { productCatalog, getProductExtras } from "../catalog-data.js";
import { addItemToCart } from "../lib/cart";
import { redirectToStripeCheckout } from "../lib/stripe-checkout";

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [quantity, setQuantity] = useState(1);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  
  // Find product from catalog
  const product = productCatalog.find(p => p.slug === slug);
  const extras = product ? getProductExtras(slug) : null;

  const addToCart = () => {
    if (!product) return;
    addItemToCart(slug, quantity);
    toast.success("Added to cart!");
    setQuantity(1);
  };

  const buyNow = async () => {
    if (!product) return;

    setIsBuyingNow(true);
    try {
      await redirectToStripeCheckout([{ slug, quantity }]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to start checkout");
      setIsBuyingNow(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container py-12">
          <p className="text-muted-foreground">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card/50">
        <div className="container py-4">
          <Link href="/shop" className="inline-flex items-center gap-2 text-accent hover:opacity-80">
              <ChevronLeft size={18} />
              Back to Shop
          </Link>
        </div>
      </div>

      {/* Product */}
      <div className="section-spacing">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-[3/4] bg-card rounded-lg overflow-hidden">
              {product.coverImageUrl && (
                <img
                  src={product.coverImageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Details */}
            <div>
              <div className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300 border border-emerald-500/30 mb-4">
                Live digital product • Instant access
              </div>
              {extras.saleLabel && (
                <div className="inline-flex items-center rounded-full bg-destructive px-3 py-1 text-sm font-semibold text-destructive-foreground mb-4">
                  {extras.saleLabel}
                </div>
              )}
              <p className="text-accent uppercase text-sm font-semibold mb-4">{product.category}</p>
              <h1 className="text-5xl font-bold mb-6">{product.title}</h1>
              
              {/* Star Rating System */}
              <div className="mb-8 pb-8 border-b border-border">
                <div className="space-y-3">
                  {/* Display Average Rating */}
                  {extras.rating ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${
                              i < Math.floor(extras.rating.averageRating)
                                ? "fill-accent text-accent"
                                : i < extras.rating.averageRating
                                ? "fill-accent text-accent opacity-50"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-accent">{extras.rating.averageRating.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground">
                        ({extras.rating.voteCount} {extras.rating.voteCount === 1 ? "review" : "reviews"})
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} className="text-muted-foreground/40" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">No ratings yet</span>
                    </div>
                  )}

                  {/* Clickable Rating System */}
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-sm font-semibold text-muted-foreground">Rate this:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => {
                            const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
                            if (!isLoggedIn) {
                              alert("Must be logged in to rate");
                            } else {
                              toast.success(`You rated this product ${star} stars`);
                            }
                          }}
                          className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
                          title={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                        >
                          <Star size={24} className="text-muted-foreground hover:fill-yellow-400 hover:text-yellow-400 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Written Reviews Badge */}
                  {extras.rating?.writtenReviews && extras.rating.writtenReviews.length > 0 && (
                    <div className="pt-2">
                      <a href="#reviews" className="text-sm font-bold uppercase tracking-wider text-accent hover:text-yellow-300 transition-colors inline-flex items-center gap-1">
                        ★ Read {extras.rating.writtenReviews.length} Written {extras.rating.writtenReviews.length === 1 ? "Review" : "Reviews"}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="prose-lg mb-8 whitespace-pre-line">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-end gap-3 flex-wrap">
                  <p className="text-4xl font-bold text-accent">${product.price}</p>
                  {extras.compareAtPrice && (
                    <p className="text-lg text-muted-foreground line-through">${extras.compareAtPrice}</p>
                  )}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center border border-border rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-card transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 text-center bg-background border-l border-r border-border py-2"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-card transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <button
                    onClick={addToCart}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                  <button
                    onClick={buyNow}
                    disabled={isBuyingNow}
                    className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isBuyingNow ? "Opening Stripe…" : "Buy Now"}
                  </button>
                </div>
              </div>

              {extras.review && (
                <div className="bg-card border border-border rounded-lg p-6 mb-8">
                  <div className="flex items-center gap-1 text-accent mb-3">
                    {Array.from({ length: extras.review.rating }).map((_, index) => (
                      <Star key={index} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed mb-4">“{extras.review.quote}”</p>
                  <p className="font-semibold">{extras.review.author}</p>
                  <p className="text-sm text-muted-foreground">{extras.review.role}</p>
                </div>
              )}

              {extras.premium && (
                <div className="bg-card border border-border rounded-lg p-6 mb-8 space-y-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-2">Premium dossier</p>
                    <h2 className="text-2xl font-bold mb-3">{extras.premium.title}</h2>
                    <p className="text-muted-foreground whitespace-pre-line">{extras.premium.chart}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Structural model</h3>
                    <pre className="bg-background/80 border border-border rounded p-4 overflow-x-auto text-sm leading-6 whitespace-pre-wrap text-muted-foreground">{extras.premium.diagram}</pre>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">What the premium edition includes</h3>
                    <ul className="grid gap-3 md:grid-cols-2">
                      {extras.premium.inclusions.map((item) => (
                        <li key={item} className="rounded border border-border bg-background/60 px-4 py-3 text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Collector print upgrades</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      {extras.premium.printUpsells.map((item) => (
                        <div key={item} className="rounded border border-border p-4 flex items-center justify-between gap-3 bg-background/60">
                          <span>{item}</span>
                          <span className="text-accent font-semibold">Request quote</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Written Reviews Section */}
              {extras.rating?.writtenReviews && extras.rating.writtenReviews.length > 0 && (
                <div id="reviews" className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4">
                  <h3 className="text-2xl font-bold mb-4">Customer Reviews ({extras.rating.writtenReviews.length})</h3>
                  <div className="space-y-4">
                    {extras.rating.writtenReviews.map((review: any, idx: number) => (
                      <div
                        key={idx}
                        className="bg-background/60 rounded-lg p-4 border border-border/50 space-y-2"
                      >
                        {/* Rating Stars */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  i < Math.floor(review.rating)
                                    ? "fill-accent text-accent"
                                    : i < review.rating
                                    ? "fill-accent text-accent opacity-50"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          {review.isVerified && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/15 rounded-full text-xs font-semibold text-green-400">
                              <span>✓</span>
                              <span>Verified</span>
                            </div>
                          )}
                        </div>

                        {/* Review Text */}
                        <p className="text-sm leading-relaxed">"{review.text}"</p>

                        {/* Author */}
                        <p className="text-xs font-semibold text-muted-foreground">— {review.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Signals */}
              <div className="border-t border-border pt-8 space-y-4">
                <div className="flex gap-3">
                  <div className="text-accent">✓</div>
                  <div>
                    <p className="font-semibold">Instant Delivery</p>
                    <p className="text-sm text-muted-foreground">Download immediately after purchase</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-accent">✓</div>
                  <div>
                    <p className="font-semibold">Lifetime Access</p>
                    <p className="text-sm text-muted-foreground">Permanent digital ownership</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-accent">✓</div>
                  <div>
                    <p className="font-semibold">Secure Purchase</p>
                    <p className="text-sm text-muted-foreground">SSL encrypted transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
