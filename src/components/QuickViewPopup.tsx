import { useState, useRef, useEffect } from "react";
import { X, ShoppingBasket, Zap, Star } from "lucide-react";
import { getProductExtras } from "../catalog-data.js";
import ReviewsPopup from "./ReviewsPopup";

interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  description: string;
  coverImageUrl?: string;
}

interface QuickViewPopupProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewPopup({ product, onClose }: QuickViewPopupProps) {
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (product) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "";
      };
    }
  }, [product, onClose]);

  if (!product) return null;

  const extras = getProductExtras(product.slug);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        ref={popupRef}
        className="bg-card border border-border rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: `
            0 20px 60px rgba(212, 175, 105, 0.2),
            0 0 40px rgba(212, 175, 105, 0.1),
            inset 0 1px 0 rgba(212, 175, 105, 0.2)
          `,
        }}
      >
        {/* Header with Close Button */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-accent/20 hover:bg-accent/40 rounded-full text-foreground transition-all duration-300 backdrop-blur"
          >
            <X size={24} />
          </button>

          {/* Product Image */}
          <div className="aspect-video bg-muted overflow-hidden relative group">
            {product.coverImageUrl && (
              <img
                src={product.coverImageUrl}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            {extras.saleLabel && (
              <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-destructive px-3 py-1.5 text-xs font-bold text-destructive-foreground uppercase letter-spacing-wide">
                {extras.saleLabel}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Category & Title */}
          <div>
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
              {product.category}
            </p>
            <h2 className="text-3xl font-bold text-foreground mb-2">{product.title}</h2>
          </div>

          {/* Star Rating System */}
          <div className="pb-3 border-b border-border/50 space-y-2">
            <div className="space-y-1">
              {/* Display Average Rating */}
              {extras.rating ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
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
                  <span className="text-sm font-semibold text-accent">{extras.rating.averageRating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">
                    ({extras.rating.voteCount} {extras.rating.voteCount === 1 ? "review" : "reviews"})
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="text-muted-foreground/40" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">No ratings yet</span>
                </div>
              )}

              {/* Clickable Rating System */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-muted-foreground">Rate this:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        // Simulated auth check - in real app would check actual auth
                        const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
                        if (!isLoggedIn) {
                          setShowLoginToast(true);
                          setTimeout(() => setShowLoginToast(false), 3000);
                        } else {
                          setUserRating(star);
                        }
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="cursor-pointer transition-transform hover:scale-110"
                      title={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                    >
                      <Star
                        size={20}
                        className={`${
                          star <= (hoverRating || userRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Toast */}
              {showLoginToast && (
                <div className="text-xs text-destructive bg-destructive/10 rounded px-2 py-1 flex items-center gap-1">
                  <span>🔒</span>
                  <span>Must be logged in to rate</span>
                </div>
              )}
            </div>

            {/* Written Reviews Badge */}
            {extras.rating?.writtenReviews && extras.rating.writtenReviews.length > 0 && (
              <button
                onClick={() => setShowReviews(true)}
                className="w-full text-left px-3 py-2 bg-accent/15 hover:bg-accent/25 rounded-lg transition-all duration-300 border border-accent/30 hover:border-accent/60"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                  ★ Read {extras.rating.writtenReviews.length} Written {extras.rating.writtenReviews.length === 1 ? "Review" : "Reviews"}
                </span>
              </button>
            )}
          </div>

          {/* Pricing */}
          <div className="pb-3 border-b border-border/50">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-accent">${product.price.toFixed(2)}</span>
              {extras.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${extras.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Short Description */}
          <div className="pb-3 border-b border-border/50">
            <p className="text-sm text-foreground/90 leading-relaxed">
              {product.description.substring(0, 150)}
              {product.description.length > 150 ? "..." : ""}
            </p>
          </div>

          {/* Expandable Detailed Description */}
          {product.description.length > 150 && (
            <div>
              <button
                onClick={() => setExpandedDescription(!expandedDescription)}
                className="text-sm font-semibold text-accent hover:text-yellow-300 transition-colors mb-2 flex items-center gap-2"
              >
                <span>{expandedDescription ? "Show Less" : "Show More Details"}</span>
                <span className={`transition-transform ${expandedDescription ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              {expandedDescription && (
                <div className="bg-muted/50 rounded-xl p-3 mb-3 text-sm text-foreground/80 leading-relaxed">
                  {product.description}
                </div>
              )}
            </div>
          )}

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-3 py-3 border-b border-border/50">
            <div className="text-xs">
              <span className="text-muted-foreground">Category</span>
              <p className="font-semibold text-accent">{product.category}</p>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Availability</span>
              <p className="font-semibold text-green-400">In Stock</p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic would go here
                console.log("Added to cart:", product.id);
                onClose();
              }}
              className="btn-secondary flex items-center justify-center gap-2 py-3 px-4"
            >
              <ShoppingBasket size={18} />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                // Quick buy logic would go here
                console.log("Quick buy:", product.id);
                onClose();
              }}
              className="btn-primary flex items-center justify-center gap-2 py-3 px-4"
            >
              <Zap size={18} />
              <span>Quick Buy</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-center pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              📦 Free shipping on orders over $100 • 🛡️ 30-day satisfaction guarantee
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Popup */}
      {showReviews && (
        <ReviewsPopup
          productTitle={product.title}
          reviews={extras.rating?.writtenReviews || null}
          onClose={() => setShowReviews(false)}
        />
      )}

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
