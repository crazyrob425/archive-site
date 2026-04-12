import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-12">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">About The Archive</h1>
          <p className="text-muted-foreground">Preserving rare knowledge since 2019</p>
        </div>
      </div>

      {/* Story */}
      <section className="section-spacing">
        <div className="container max-w-3xl">
          <div className="badge-gold mb-6">Est. 2019</div>
          <h2 className="text-4xl font-bold mb-8">Our Story</h2>
          <div className="space-y-6 prose-lg text-muted-foreground">
            <p>
              The Archive of Rare Knowledge was founded in 2019 with a singular mission: to preserve and distribute the world's most valuable niche information. What began as a passion project has evolved into the internet's most trusted digital bookstore for rare guides, out-of-print technical manuals, and specialized knowledge.
            </p>
            <p>
              When the global pandemic arrived in 2020, we experienced unprecedented demand from researchers, hobbyists, and professionals seeking knowledge that had become inaccessible. Home-bound scholars discovered our collection, and we doubled down on our commitment to instant digital delivery and lifetime access.
            </p>
            <p>
              Today, we serve thousands of customers worldwide, offering meticulously curated collections across four specialties: Lost Hobbies, Industrial Secrets, Technical Manuals, and Software Collections. Each title is carefully selected for its rarity, authority, and practical value.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-card/50 border-y border-border">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Authenticity</h3>
              <p className="text-muted-foreground">Every title in our archive is vetted for accuracy and authority. We preserve knowledge, not misinformation.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Accessibility</h3>
              <p className="text-muted-foreground">Rare knowledge should be available to everyone. Instant digital delivery ensures immediate access to your purchases.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Permanence</h3>
              <p className="text-muted-foreground">Your digital purchases are yours forever. We guarantee lifetime access to all acquired titles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section-spacing">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold mb-12">Why Trust The Archive</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="text-accent text-2xl font-bold flex-shrink-0">✓</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Verified Secure</h3>
                <p className="text-muted-foreground">All transactions are SSL encrypted and PCI-DSS compliant. Your payment information is never stored on our servers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-accent text-2xl font-bold flex-shrink-0">✓</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Instant Delivery</h3>
                <p className="text-muted-foreground">Digital products are delivered immediately after successful payment. No waiting, no delays.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-accent text-2xl font-bold flex-shrink-0">✓</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Lifetime Access</h3>
                <p className="text-muted-foreground">Once purchased, your digital titles are yours forever. Download anytime from your account.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-accent text-2xl font-bold flex-shrink-0">✓</div>
              <div>
                <h3 className="font-bold text-lg mb-2">DMCA Protected</h3>
                <p className="text-muted-foreground">All content is protected under DMCA regulations. We respect intellectual property rights.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-accent text-2xl font-bold flex-shrink-0">✓</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Customer Support</h3>
                <p className="text-muted-foreground">Our team is available to assist with any questions about your purchases or account.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Contact */}
      <section className="section-spacing border-t border-border">
        <div className="container max-w-2xl">
          <h2 className="text-4xl font-bold mb-12">Get in Touch</h2>
          <div className="bg-card/50 p-8 rounded-lg border border-border">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">Support Address</h3>
                <p className="text-muted-foreground">12320 Willow Hill Drive<br/>Moorpark, CA US</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Support Phone</h3>
                <a href="tel:+14013491330" className="text-accent hover:underline text-lg font-semibold">+1 (401) 349-1330</a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available for inquiries about purchases, account issues, and custom research requests.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-card/50 border-t border-border">
        <div className="container max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-lg text-muted-foreground mb-8">Browse our complete collection of rare guides and technical manuals.</p>
          <Link href="/shop" className="btn-primary inline-block">
            Browse Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
