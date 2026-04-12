import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Loader2, ChevronDown } from "lucide-react";
import { Link } from "wouter";

export default function AdminOrders() {
  const { user } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const { data: orders, isLoading } = trpc.orders.list.useQuery(undefined);

  const updateStatus = trpc.orders.updateStatus.useMutation({
    onSuccess: () => {
      // Refetch orders
    },
  });

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container py-24 text-center">
          <p className="text-muted-foreground mb-6">Access denied</p>
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
          <h1 className="text-5xl font-bold">Order Management</h1>
        </div>
      </div>

      <div className="section-spacing">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                      <p className="font-bold text-lg">${order.totalAmount}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        order.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {order.status}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`transition-transform ${expandedOrder === order.id ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {expandedOrder === order.id && (
                    <div className="border-t border-border p-6 bg-card/50 space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Customer Email</p>
                        <p className="font-semibold">{order.customerEmail || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Status</p>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus.mutate({
                              orderId: order.id,
                              status: e.target.value as any,
                            })
                          }
                          className="px-3 py-2 bg-background border border-border rounded text-foreground"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="failed">Failed</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No orders yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
