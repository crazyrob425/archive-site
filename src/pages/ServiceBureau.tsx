import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { serviceBureauContent } from "./catalog-data.js";

export default function ServiceBureau() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectTitle: "",
    description: "",
    deliverableFormat: "PDF + ePub",
    bindingStyle: "Softback",
    materialFinish: "Archival cloth",
    visualPackage: "Standard charts",
  });

  const submitRequest = trpc.serviceBureau.create.useMutation({
    onSuccess: () => {
      toast.success("Request submitted! We'll be in touch soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectTitle: "",
        description: "",
        deliverableFormat: "PDF + ePub",
        bindingStyle: "Softback",
        materialFinish: "Archival cloth",
        visualPackage: "Standard charts",
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to submit request");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRequest.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectTitle: formData.projectTitle,
      description: [
        formData.description,
        `\nDeliverable format: ${formData.deliverableFormat}`,
        `Binding style: ${formData.bindingStyle}`,
        `Binding material: ${formData.materialFinish}`,
        `Visual package: ${formData.visualPackage}`,
      ].join("\n"),
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50 py-12">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Service Bureau</h1>
          <p className="text-muted-foreground">Custom research guides and workbooks created for your specific needs</p>
        </div>
      </div>

      <section className="section-spacing">
        <div className="container max-w-3xl">
          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Custom Research & Guide Creation</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Beyond our curated collection, The Archive offers a premium Service Bureau for custom research and guide creation. Our expert team can create bespoke how-to books, technical workbooks, and specialized guides tailored to your exact requirements.
              </p>
              <p>
                Whether you need a comprehensive guide on a niche topic, a technical manual for specialized equipment, or a custom workbook for training purposes, we have the expertise to deliver.
              </p>
            </div>
          </div>

          <div className="mb-12 rounded-lg border border-accent/40 bg-accent/10 p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-2">Limited-time founder offer</p>
                <h3 className="text-3xl font-bold">${serviceBureauContent.foundersDiscountRate}/hour launch pricing</h3>
                <p className="text-muted-foreground">Normally ${serviceBureauContent.standardRate}/hour • {serviceBureauContent.minimumHours}-hour minimum • {serviceBureauContent.foundersDiscountNote}</p>
              </div>
              <div className="rounded border border-border bg-background/80 px-4 py-3 text-sm text-muted-foreground">
                Preferred by collectors, researchers, and publishers who want a polished manuscript from day one.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Pricing</h3>
              <p className="text-4xl font-bold text-accent mb-2">${serviceBureauContent.foundersDiscountRate}<span className="text-lg">/hour</span></p>
              <p className="text-muted-foreground">Launch pricing • Normally ${serviceBureauContent.standardRate}/hour</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Timeline</h3>
              <p className="text-lg mb-2">2-4 weeks</p>
              <p className="text-muted-foreground">{serviceBureauContent.timeline}</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Popular upgrade paths</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {serviceBureauContent.upsells.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                  <span>{item.name}</span>
                  <span className="font-semibold text-accent">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">What We Can Create</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "How-to guides and tutorials",
                "Technical manuals and documentation",
                "Training workbooks and curricula",
                "Industry-specific guides",
                "Research compilations",
                "Custom reference materials",
              ].map((item) => (
                <div key={item} className="flex gap-3 p-4 bg-card border border-border rounded">
                  <div className="text-accent font-bold flex-shrink-0">✓</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Recent commissions</h2>
            <div className="grid gap-4">
              {serviceBureauContent.recentCommissions.map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-card/50 border-y border-border">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">Submit a Request</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Project Title *</label>
              <input
                type="text"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground"
                placeholder="e.g., Advanced Woodworking Techniques Guide"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Project Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 bg-background border border-border rounded text-foreground placeholder-muted-foreground"
                placeholder="Describe your project in detail. What topics should be covered? What is the intended audience? Any specific requirements or constraints?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Deliverable format</label>
                <select
                  name="deliverableFormat"
                  value={formData.deliverableFormat}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded text-foreground"
                >
                  <option>PDF + ePub</option>
                  <option>PDF only</option>
                  <option>PDF + print-ready files</option>
                  <option>Research dossier + slides</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Binding style</label>
                <select
                  name="bindingStyle"
                  value={formData.bindingStyle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded text-foreground"
                >
                  <option>Softback</option>
                  <option>Hardback</option>
                  <option>Collector hardback</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Binding material</label>
                <select
                  name="materialFinish"
                  value={formData.materialFinish}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-background border border-border rounded text-foreground"
                >
                  <option>Archival cloth</option>
                  <option>Faux leather</option>
                  <option>Real leather</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Visual package</label>
              <select
                name="visualPackage"
                value={formData.visualPackage}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded text-foreground"
              >
                <option>Standard charts</option>
                <option>Custom charts and graphs pack</option>
                <option>Illustrated appendix bundle</option>
                <option>Charts + graphs + technical diagrams</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitRequest.isPending}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitRequest.isPending && <Loader2 className="animate-spin" size={20} />}
              {submitRequest.isPending ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {serviceBureauContent.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-bold mb-2">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
