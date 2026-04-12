import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Loader2, ChevronDown } from "lucide-react";
import { Link } from "wouter";

export default function AdminRequests() {
  const { user } = useAuth();
  const [expandedRequest, setExpandedRequest] = useState<number | null>(null);

  const { data: requests, isLoading } = trpc.serviceBureau.list.useQuery({});

  const updateStatus = trpc.serviceBureau.update.useMutation({
    onSuccess: () => {
      // Refetch requests
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
          <h1 className="text-5xl font-bold">Service Bureau Requests</h1>
        </div>
      </div>

      <div className="section-spacing">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          ) : requests && requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request: any) => (
                <div key={request.id} className="bg-card border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-card/80 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <p className="text-sm text-muted-foreground">Request #{request.id}</p>
                      <p className="font-bold text-lg">{request.projectTitle}</p>
                      <p className="text-sm text-muted-foreground">{request.name} ({request.email})</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        request.status === "new" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"
                      }`}>
                        {request.status}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`transition-transform ${expandedRequest === request.id ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  {expandedRequest === request.id && (
                    <div className="border-t border-border p-6 bg-card/50 space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Contact Information</p>
                        <p className="font-semibold">{request.name}</p>
                        <p className="text-sm">{request.email}</p>
                        {request.phone && <p className="text-sm">{request.phone}</p>}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Project Description</p>
                        <p className="text-sm whitespace-pre-wrap">{request.description}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Status</p>
                        <select
                          value={request.status}
                          onChange={(e) =>
                            updateStatus.mutate({
                              id: request.id,
                              data: { status: e.target.value },
                            })
                          }
                          className="px-3 py-2 bg-background border border-border rounded text-foreground"
                        >
                          <option value="new">New</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No service bureau requests yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
