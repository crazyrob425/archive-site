export default function Shipping() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50 py-12">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Digital Shipping & Handling</h1>
          <p className="text-muted-foreground">Instant delivery of your digital purchases</p>
        </div>
      </div>

      <div className="section-spacing">
        <div className="container max-w-3xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">How Digital Delivery Works</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-accent font-bold text-2xl flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Complete Your Purchase</h3>
                    <p className="text-muted-foreground">Add items to your cart and proceed to checkout. All transactions are processed securely through Stripe.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-accent font-bold text-2xl flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Instant Confirmation</h3>
                    <p className="text-muted-foreground">Upon successful payment, you will receive an order confirmation email with download instructions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-accent font-bold text-2xl flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Download Your Files</h3>
                    <p className="text-muted-foreground">Click the download link in your email or log into your account to download your purchased titles immediately.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-accent font-bold text-2xl flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Lifetime Access</h3>
                    <p className="text-muted-foreground">Your purchases are permanently stored in your account. Download anytime, anywhere, forever.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-12">
              <h2 className="text-3xl font-bold mb-6">File Formats & Compatibility</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">PDF Format</h3>
                  <p className="text-muted-foreground">Compatible with all devices and operating systems. View on computers, tablets, and smartphones. No special software required.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">ePub Format</h3>
                  <p className="text-muted-foreground">Optimized for e-readers and reading apps. Supported by Kindle, Apple Books, Google Play Books, and most e-reading applications.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-2">What if I don't receive my download link?</h3>
                  <p className="text-muted-foreground">Check your spam folder first. If you still don't see the email, log into your account and visit the Downloads section to access your purchases.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Can I download my files multiple times?</h3>
                  <p className="text-muted-foreground">Yes. You can download your purchased titles as many times as you need. Your files are permanently available in your account.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Are there any file size limitations?</h3>
                  <p className="text-muted-foreground">No. All files are available for download regardless of size. Download speeds depend on your internet connection.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Can I share my purchased files?</h3>
                  <p className="text-muted-foreground">Your purchase grants you a personal license to the content. Sharing, reselling, or distributing the files is prohibited under our Terms of Service and copyright law.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">What if a download link expires?</h3>
                  <p className="text-muted-foreground">Download links do not expire. You can always access your files from your account dashboard.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-12 bg-card/50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-4">If you experience any issues with your digital delivery, our support team is here to help. Contact us at support@archive-rare-knowledge.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
