import { useState } from "react";
import { Download, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Account() {
  const [activeTab, setActiveTab] = useState("orders");

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userName");
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";
  const userName = localStorage.getItem("userName") || "User";

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Sign in to your account</h1>
          <Link href="/account" className="btn-primary inline-block">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50 py-12">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-2">My Account</h1>
              <p className="text-muted-foreground">Welcome, {userName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center gap-2"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container flex gap-8">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-4 font-semibold border-b-2 transition-colors ${
              activeTab === "orders"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab("downloads")}
            className={`px-4 py-4 font-semibold border-b-2 transition-colors ${
              activeTab === "downloads"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Downloads
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-4 font-semibold border-b-2 transition-colors ${
              activeTab === "profile"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Profile
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="section-spacing">
        <div className="container max-w-4xl">
          {activeTab === "orders" && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Order History</h2>
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-6">No orders yet. Your purchases will appear here.</p>
                <Link href="/shop" className="btn-primary inline-block">
                  Start Shopping
                </Link>
              </div>
            </div>
          )}

          {activeTab === "downloads" && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Your Downloads</h2>
              <div className="text-center py-12">
                <Download className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-6">Download links will appear here after your first purchase</p>
                <Link href="/shop" className="btn-primary inline-block">
                  Browse Products
                </Link>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Profile Information</h2>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <p className="font-semibold">{user?.name || "Not provided"}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-semibold">{user?.email || "Not provided"}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Member Since</label>
                  <p className="font-semibold">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
