export default function Refund() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50 py-12">
        <div className="container">
          <h1 className="text-5xl font-bold">Refund Policy</h1>
        </div>
      </div>

      <div className="section-spacing">
        <div className="container max-w-3xl prose-lg text-muted-foreground space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Digital Products & Refunds</h2>
            <p>
              The Archive of Rare Knowledge specializes in the sale of digital products. Due to the nature of digital goods, our refund policy reflects industry standards for instant-delivery digital content.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Refund Eligibility</h2>
            <p>
              Since all digital products are delivered immediately upon purchase, refunds are generally not available after the transaction is complete. However, we understand that issues can arise. Refunds may be considered in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Technical failure or corruption of the downloaded file</li>
              <li>Product does not match the description provided on our website</li>
              <li>Duplicate or accidental purchase within 24 hours</li>
              <li>Unauthorized transaction (fraud)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Request a Refund</h2>
            <p>
              To request a refund, please contact our support team within 30 days of your purchase with:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Your order number</li>
              <li>The email address associated with your account</li>
              <li>A detailed description of the issue</li>
              <li>Any supporting documentation or screenshots</li>
            </ul>
            <p className="mt-4">
              Email: support@archive-rare-knowledge.com
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Refund Processing</h2>
            <p>
              If your refund request is approved, we will process the refund to your original payment method within 5-10 business days. Please note that your financial institution may take an additional 1-2 business days to reflect the refund in your account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Non-Refundable Items</h2>
            <p>
              The following are non-refundable:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Products purchased more than 30 days ago</li>
              <li>Custom research projects from our Service Bureau (unless work has not begun)</li>
              <li>Products purchased during promotional sales or with discount codes</li>
              <li>Products that have been shared, resold, or redistributed</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Chargebacks & Disputes</h2>
            <p>
              If you initiate a chargeback or dispute with your credit card company without first contacting us, we reserve the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Revoke your access to all purchased digital products</li>
              <li>Suspend your account</li>
              <li>Pursue legal action to recover chargeback fees</li>
            </ul>
            <p className="mt-4">
              We encourage you to contact our support team first to resolve any issues.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p>
              If you have questions about our refund policy or need to request a refund, please contact our support team:
            </p>
            <p className="mt-4">
              Email: support@archive-rare-knowledge.com<br />
              Response time: 1-2 business days
            </p>
          </div>

          <div>
            <p className="text-sm">Last updated: April 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
