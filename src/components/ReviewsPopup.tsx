import { useState, useRef, useEffect } from "react";
import { X, Star, CheckCircle } from "lucide-react";

interface Review {
  author: string;
  text: string;
  rating: number;
  isVerified: boolean;
}

interface ReviewsPopupProps {
  productTitle: string;
  reviews: Review[] | null;
  onClose: () => void;
}

export default function ReviewsPopup({ productTitle, reviews, onClose }: ReviewsPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (reviews && reviews.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "";
      };
    }
  }, [reviews, onClose]);

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div
        ref={popupRef}
        className="bg-card border border-border rounded-3xl overflow-hidden max-w-md w-full shadow-2xl animate-scale-in max-h-[80vh] flex flex-col"
        style={{
          boxShadow: `
            0 20px 60px rgba(212, 175, 105, 0.2),
            0 0 40px rgba(212, 175, 105, 0.1),
            inset 0 1px 0 rgba(212, 175, 105, 0.2)
          `,
        }}
      >
        {/* Header */}
        <div className="border-b border-border/50 p-4 flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur">
          <h3 className="text-lg font-bold text-foreground">Customer Reviews</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent/20 rounded-full transition-all duration-300"
          >
            <X size={20} className="text-foreground" />
          </button>
        </div>

        {/* Reviews List - Scrollable */}
        <div className="overflow-y-auto flex-1 space-y-3 p-4">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-muted/50 rounded-xl p-3 border border-border/30 space-y-2"
            >
              {/* Rating Stars */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
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
                <span className="text-xs font-semibold text-accent">
                  {review.rating}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-sm text-foreground/90 leading-relaxed">
                "{review.text}"
              </p>

              {/* Author & Verified Badge */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-muted-foreground">
                  {review.author}
                </span>
                {review.isVerified && (
                  <div
                    className="flex items-center gap-1 px-2 py-1 bg-green-500/15 rounded-full group relative"
                    title="Verified purchase from our platform"
                  >
                    <CheckCircle size={12} className="text-green-400" />
                    <span className="text-xs font-semibold text-green-400">
                      Verified
                    </span>
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-foreground text-background text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                      We verified this review was written by someone who purchased this product through our platform
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

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
