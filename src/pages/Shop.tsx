import { useState, useMemo } from "react";
import { Link, useSearch } from "wouter";
import { Search, Eye, Star } from "lucide-react";
import { productCatalog, getProductExtras } from "../catalog-data.js";
import QuickViewPopup from "../components/QuickViewPopup";

export default function Shop() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const [category, setCategory] = useState(params.get("category") || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = useMemo(() => {
    return productCatalog.filter((p: any) => {
      const matchCategory = !category || p.category === category;
      const matchSearch = !searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [category, searchTerm]);

  const categories = [
    { value: "", label: "All Products" },
    { value: "lost-hobbies", label: "Lost Hobbies" },
    { value: "industrial-secrets", label: "Industrial Secrets" },
    { value: "technical-manuals", label: "Technical Manuals" },
    { value: "software-collections", label: "Software Collections" },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-12">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Shop</h1>
          <p className="text-muted-foreground">Browse our collection of rare guides and technical manuals</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-spacing">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    placeholder="Search titles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-semibold mb-4">Category</label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={`w-full text-left px-4 py-2 rounded transition-colors ${
                        category === cat.value
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "hover:bg-card text-foreground"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {products && products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
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
                        <p className="text-xs text-accent uppercase font-semibold mb-2">{product.category}</p>
                        <h3 className="font-bold line-clamp-2 mb-3">{product.title}</h3>
                        
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
                            <span className="text-xs text-muted-foreground">({getProductExtras(product.slug).rating.voteCount})</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <p className="text-accent font-semibold">${product.price}</p>
                          {getProductExtras(product.slug).compareAtPrice && (
                            <p className="text-xs text-muted-foreground line-through">${getProductExtras(product.slug).compareAtPrice}</p>
                          )}
                        </div>
                        {/* View Details Link */}
                        <Link href={`/product/${product.slug}`} className="inline-block mt-3 text-xs text-accent hover:text-yellow-300 font-semibold transition-colors">
                          View Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Popup */}
      <QuickViewPopup product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
