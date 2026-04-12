import { useState } from "react";
import { Link } from "wouter";
import { ShoppingCart, BookOpen, Award, Eye, Star } from "lucide-react";
import { productCatalog, getProductExtras, serviceBureauContent, storeTestimonials } from "../catalog-data.js";
import QuickViewPopup from "../components/QuickViewPopup";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const featuredProducts = productCatalog.filter((p: any) => p.featured);

  return (
    <div className="bg-background text-foreground">
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
          </div>
        </div>
      </nav>

      {/* Hero Section - Ultra Luxury */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background gradient element */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-yellow-600 via-orange-500 to-transparent blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-600 to-transparent blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="badge-gold mb-8 inline-block">✨ Est. 2019 — The World's Premier Rare Knowledge Archive</div>
            <h1 className="hero-text mb-8">
              The Archive of Rare Knowledge
            </h1>
            <p className="text-2xl text-muted-foreground mb-6 leading-relaxed font-light" style={{letterSpacing: '0.3px'}}>
              Discover extraordinary guides, out-of-print technical manuals, and obscure niche knowledge from the world's most sophisticated digital bibliotheca. Curated with precision. Delivered instantly. Owned forever.
            </p>
            <p className="text-lg text-accent mb-12 font-light italic">
              Where serious knowledge seekers acquire what others cannot find.
            </p>
            <div className="flex gap-6">
              <Link href="/shop" className="btn-primary">
                Explore Our Collection
              </Link>
              <Link href="/service-bureau" className="btn-secondary">
                Commission Custom Research
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals - Premium */}
      <section className="section-spacing bg-card border-y border-border">
        <div className="container">
          <p className="text-center text-accent font-bold text-sm tracking-widest mb-12">TRUSTED BY EXPERTS & COLLECTORS WORLDWIDE</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="card">
              <div className="text-3xl font-bold text-accent mb-2">28+</div>
              <h3 className="font-bold text-lg mb-2">Premium Collections</h3>
              <p className="text-sm text-muted-foreground">Curated niche knowledge across 4 major categories</p>
            </div>
            <div className="card">
              <Award className="w-8 h-8 text-accent mx-0 mb-4" />
              <h3 className="font-bold text-lg mb-2">Military-Grade Security</h3>
              <p className="text-sm text-muted-foreground">SSL + encrypted transactions with zero data tracking</p>
            </div>
            <div className="card">
              <BookOpen className="w-8 h-8 text-accent mx-0 mb-4" />
              <h3 className="font-bold text-lg mb-2">Instant Digital Transfer</h3>
              <p className="text-sm text-muted-foreground">Access your purchase within seconds. Forever ownership.</p>
            </div>
            <div className="card">
              <Star className="w-8 h-8 text-accent mx-0 mb-4" />
              <h3 className="font-bold text-lg mb-2">Verified Reviews</h3>
              <p className="text-sm text-muted-foreground">Authentic purchaser feedback & verified ratings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-spacing">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12">Featured Titles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product: any) => (
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
        </div>
      </section>

      {/* Social Proof - Premium */}
      <section className="section-spacing">
        <div className="container">
          <p className="text-center text-accent font-bold text-sm tracking-widest mb-8">READER TESTIMONIALS</p>
          <h2 className="mb-16">What Distinguished Collectors Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeTestimonials.map((testimonial, idx) => (
              <div key={testimonial.name} className="card relative">
                <div className="absolute -top-4 -left-4 text-6xl text-accent/20 font-bold">"</div>
                <p className="text-lg leading-relaxed mb-8 italic text-foreground">"{testimonial.quote}"</p>
                <div className="border-t border-border pt-6">
                  <p className="font-bold text-base">{testimonial.name}</p>
                  <p className="text-sm text-accent font-semibold">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections - Premium */}
      <section className="section-spacing bg-card border-y border-border">
        <div className="container">
          <p className="text-center text-accent font-bold text-sm tracking-widest mb-8">FOUR DISTINGUISHED CURATIONS</p>
          <h2 className="mb-16">Our Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { slug: "lost-hobbies", name: "Lost Hobbies", desc: "Forgotten crafts, artisanal techniques, pre-industrial methods" },
              { slug: "industrial-secrets", name: "Industrial Secrets", desc: "Proprietary manufacturing blueprints, production workflows" },
              { slug: "technical-manuals", name: "Technical Manuals", desc: "Out-of-print documentation, archival engineering records" },
              { slug: "software-collections", name: "Software Collections", desc: "Digital protocols, encryption methods, legacy systems" },
            ].map((cat) => (
              <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="card group cursor-pointer">
                <h3 className="font-bold mb-3 text-lg group-hover:text-accent transition-colors">{cat.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
                <div className="mt-6 text-xs text-accent font-bold tracking-wider">EXPLORE COLLECTION →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-amber-600 to-transparent blur-3xl"></div>
        </div>
        
        <div className="container max-w-3xl text-center relative z-10">
          <p className="text-accent font-bold text-sm tracking-widest mb-6">CUSTOM SCHOLARSHIP</p>
          <h2 className="mb-8">Commission a Bespoke Guide</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-light">
            Our dedicated Service Bureau specializes in creating meticulously researched, professionally written bespoke guides tailored precisely to your specifications. <span className="text-accent font-semibold">Founder's rate: ${serviceBureauContent.foundersDiscountRate}/hour</span> (regularly ${serviceBureauContent.standardRate}/hour), with a {serviceBureauContent.minimumHours}-hour minimum commitment.
          </p>
          <Link href="/service-bureau" className="btn-primary">
            Initiate Custom Research
          </Link>
        </div>
      </section>

      {/* Quick View Popup */}
      <QuickViewPopup product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 mt-12">
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
