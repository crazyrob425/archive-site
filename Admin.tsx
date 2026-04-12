import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("products");

  const { data: products, isLoading: productsLoading, refetch: refetchProducts } = trpc.products.list.useQuery({});
  const { data: orders, isLoading: ordersLoading } = trpc.orders.list.useQuery(undefined);
  const { data: requests, isLoading: requestsLoading } = trpc.serviceBureau.list.useQuery({});

  const deleteProduct = trpc.products.delete.useMutation({
    onSuccess: () => {
      toast.success("Product deleted");
      refetchProducts();
    },
    onError: () => toast.error("Failed to delete product"),
  });

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You do not have permission to access this page</p>
          <Link href="/" className="btn-primary inline-block">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/50 py-12">
        <div className="container">
          <h1 className="text-5xl font-bold">Admin Dashboard</h1>
        </div>
      </div>

      <div className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container flex gap-8">
          {["products", "orders", "requests"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-4 font-semibold border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="section-spacing">
        <div className="container">
          {activeTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Products</h2>
                <Link href="/admin/products/new" className="btn-primary flex items-center gap-2">
                    <Plus size={16} />
                    Add Product
                </Link>
              </div>

              {productsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="animate-spin text-accent" size={32} />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-4 px-4 font-semibold">Title</th>
                        <th className="text-left py-4 px-4 font-semibold">Category</th>
                        <th className="text-left py-4 px-4 font-semibold">Price</th>
                        <th className="text-left py-4 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((product) => (
                        <tr key={product.id} className="border-b border-border hover:bg-card/50">
                          <td className="py-4 px-4">{product.title}</td>
                          <td className="py-4 px-4 text-muted-foreground">{product.category}</td>
                          <td className="py-4 px-4 font-semibold">${product.price}</td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <Link href={`/admin/products/${product.id}`} className="btn-ghost flex items-center gap-1 text-sm">
                                  <Edit2 size={16} />
                              </Link>
                              <button
                                onClick={() => deleteProduct.mutate({ id: product.id })}
                                disabled={deleteProduct.isPending}
                                className="btn-ghost flex items-center gap-1 text-sm text-destructive"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Orders</h2>
                <Link href="/admin/orders" className="btn-secondary">
                  View All Orders
                </Link>
              </div>
              {ordersLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="animate-spin text-accent" size={32} />
                </div>
              ) : orders && orders.length > 0 ? (
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Total orders: {orders.length}</p>
                  <p>View detailed order management in the Orders section</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No orders yet</p>
              )}
            </div>
          )}

          {activeTab === "requests" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Service Bureau Requests</h2>
                <Link href="/admin/requests" className="btn-secondary">
                  View All Requests
                </Link>
              </div>
              {requestsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="animate-spin text-accent" size={32} />
                </div>
              ) : requests && requests.length > 0 ? (
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Total requests: {requests.length}</p>
                  <p>View detailed request management in the Requests section</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No service bureau requests yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
