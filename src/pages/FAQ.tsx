import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { serviceBureauContent } from "./catalog-data.js";

const faqs = [
  {
    question: "How do I download my purchased books?",
    answer: "After purchase, log into your account and visit the Downloads section. All your purchased titles will be available for immediate download in PDF or ePub format.",
  },
  {
    question: "Do I own the books permanently?",
    answer: "Yes. Once purchased, you own a permanent digital license to the book. You can download it anytime from your account, and it will never expire.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and digital payment methods via Stripe. All transactions are secure and encrypted.",
  },
  {
    question: "Can I get a refund?",
    answer: "Since digital products are delivered immediately, we generally cannot offer refunds after purchase. However, if you experience technical issues, please contact our support team.",
  },
  {
    question: "Are the books available in different formats?",
    answer: "Most titles are available in PDF and ePub formats. Some specialized technical manuals may only be available in PDF. Check the product page for format availability.",
  },
  {
    question: "What is the Service Bureau?",
    answer: `Our Service Bureau creates custom research guides and workbooks tailored to your specific needs. Launch pricing is $${serviceBureauContent.foundersDiscountRate}/hour, normally $${serviceBureauContent.standardRate}/hour, with a ${serviceBureauContent.minimumHours}-hour minimum. Submit a request on our Services page.`,
  },
  {
    question: "What deliverables can I request?",
    answer: "You can request digital dossiers, print-ready files, softback or hardback editions, leather binding upgrades, and custom charts, graphs, or illustrations.",
  },
  {
    question: "How long does custom research take?",
    answer: serviceBureauContent.timeline,
  },
  {
    question: "What is your methodology?",
    answer: serviceBureauContent.faq[2].answer,
  },
  {
    question: "How is privacy handled?",
    answer: serviceBureauContent.faq[1].answer,
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes. We use industry-standard SSL encryption and never store credit card information. Your data is protected under our Privacy Policy.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-12">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Find answers to common questions about our service</p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="section-spacing">
        <div className="container max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/50 transition-colors text-left"
                >
                  <h3 className="font-bold">{faq.question}</h3>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 bg-card/30 border-t border-border">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
