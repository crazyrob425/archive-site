export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50 py-12">
        <div className="container">
          <h1 className="text-5xl font-bold">Privacy Policy</h1>
        </div>
      </div>

      <div className="section-spacing">
        <div className="container max-w-3xl prose-lg text-muted-foreground space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, payment information, and any communications you send us.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send transactional and promotional communications, and comply with legal obligations.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment information is processed through secure, PCI-DSS compliant systems.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Cookies and Tracking</h2>
            <p>We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Services</h2>
            <p>We use third-party service providers (such as Stripe for payments) to deliver our services. These providers are contractually obligated to use your information only as necessary to provide services to us.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at support@archive-rare-knowledge.com.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website and updating the effective date.</p>
          </div>

          <div>
            <p className="text-sm">Last updated: April 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
