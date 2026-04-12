import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, ShoppingCart, BookOpen, Award, Eye, Star } from "lucide-react";
import { useState } from "react";
import { getLoginUrl } from "@/const";
import { getProductExtras, serviceBureauContent, storeTestimonials } from "./catalog-data.js";
import QuickViewPopup from "./QuickViewPopup";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { data: featuredProducts, isLoading } = trpc.products.list.useQuery({
    featured: true,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-accent">
            Archive
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/shop" className="nav-link">
              Shop
            </Link>
            <Link href="/service-bureau" className="nav-link">
              Services
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/cart" className="nav-link flex items-center gap-2">
              <ShoppingCart size={20} />
            </Link>
            {isAuthenticated ? (
              <Link href="/account" className="nav-link">
                Account
              </Link>
            ) : (
              <a href={getLoginUrl()} className="btn-primary text-sm">
                Sign In
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-spacing relative overflow-hidden">
        <div className="container">
          <div className="max-w-3xl">
            <div className="badge-gold mb-6">Est. 2019 — Trusted Since the Pandemic</div>
            <h1 className="hero-text mb-6">
              The Archive of Rare Knowledge
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover rare guides, out-of-print technical manuals, and niche knowledge from the world's most authoritative digital bookstore. Instant delivery. Lifetime access.
            </p>
            <div className="flex gap-4">
              <Link href="/shop" className="btn-primary">
                Browse Collection
              </Link>
              <Link href="/service-bureau" className="btn-secondary">
                Custom Research
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section-spacing bg-card/50 border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold mb-2">Verified Secure</h3>
              <p className="text-sm text-muted-foreground">SSL encrypted transactions</p>
            </div>
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold mb-2">Instant Delivery</h3>
              <p className="text-sm text-muted-foreground">Download immediately after purchase</p>
            </div>
            <div className="text-center">
              <ShoppingCart className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold mb-2">Lifetime Access</h3>
              <p className="text-sm text-muted-foreground">Permanent digital ownership</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-spacing">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12">Featured Titles</h2>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.map((product: any) => (
                <div key={product.id} className="card-product group relative cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                    {product.coverImageUrl && (
                      <img
                        src={product.coverImageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                    {/* Quick View Button */}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Eye size={32} className="text-white" />
                        <span className="text-white font-semibold text-sm">Quick View</span>
                      </div>
                    </button>
                  </div>
                  <div className="p-4">
                    {getProductExtras(product.slug).saleLabel && (
                      <div className="mb-2 inline-flex items-center rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-destructive-foreground">
                        {getProductExtras(product.slug).saleLabel}
                      </div>
                    )}
                    <h3 className="font-bold line-clamp-2 mb-2">{product.title}</h3>
                    
                    {/* Star Rating */}
                    {getProductExtras(product.slug).rating && (
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < Math.floor(getProductExtras(product.slug).rating.averageRating)
                                  ? "fill-accent text-accent"
                                  : i < getProductExtras(product.slug).rating.averageRating
                                  ? "fill-accent text-accent opacity-50"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-accent">{getProductExtras(product.slug).rating.averageRating.toFixed(1)}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <p className="text-accent font-semibold">${product.price}</p>
                      {getProductExtras(product.slug).compareAtPrice && (
                        <p className="text-sm text-muted-foreground line-through">${getProductExtras(product.slug).compareAtPrice}</p>
                      )}
                    </div>
                    {/* View Details Link */}
                    <Link href={`/product/${product.slug}`} className="inline-block mt-2 text-xs text-accent hover:text-yellow-300 font-semibold transition-colors">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-spacing">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12">What readers are saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storeTestimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-card border border-border rounded-lg p-6">
                <p className="text-lg leading-relaxed mb-6">“{testimonial.quote}”</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-spacing bg-card/50 border-y border-border">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12">Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { slug: "lost-hobbies", name: "Lost Hobbies", desc: "Forgotten crafts and techniques" },
              { slug: "industrial-secrets", name: "Industrial Secrets", desc: "Pre-digital manufacturing" },
              { slug: "technical-manuals", name: "Technical Manuals", desc: "Out-of-print documentation" },
              { slug: "software-collections", name: "Software Collections", desc: "Digital tools & protocols" },
            ].map((cat) => (
              <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="p-6 bg-background border border-border rounded-lg hover:border-accent transition-colors">
                <h3 className="font-bold mb-2">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Need Custom Research?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our Service Bureau creates bespoke guides and workbooks tailored to your needs. Founder's Discount: ${serviceBureauContent.foundersDiscountRate}/hour, normally ${serviceBureauContent.standardRate}/hour, with a {serviceBureauContent.minimumHours}-hour minimum.
          </p>
          <Link href="/service-bureau" className="btn-primary">
            Request a Custom Guide
          </Link>
        </div>
      </section>

      {/* Quick View Popup */}
      <QuickViewPopup product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">The Archive</h4>
              <p className="text-sm text-muted-foreground">Premium digital bookstore for rare knowledge.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/shop" className="nav-link">All Products</Link></li>
                <li><Link href="/shop?category=lost-hobbies" className="nav-link">Lost Hobbies</Link></li>
                <li><Link href="/shop?category=technical-manuals" className="nav-link">Technical Manuals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="nav-link">About Us</Link></li>
                <li><Link href="/privacy" className="nav-link">Privacy Policy</Link></li>
                <li><Link href="/terms" className="nav-link">Terms of Service</Link></li>
                <li><Link href="/refund" className="nav-link">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faq" className="nav-link">FAQ</Link></li>
                <li><Link href="/shipping" className="nav-link">Digital Delivery</Link></li>
                <li><Link href="/service-bureau" className="nav-link">Service Bureau</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2019-2026 The Archive of Rare Knowledge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
