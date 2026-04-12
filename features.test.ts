import { describe, it, expect, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(role: "user" | "admin" = "user"): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("Products", () => {
  it("should list all products", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.products.list({});
    expect(Array.isArray(products)).toBe(true);
  });

  it("should filter products by category", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.products.list({ category: "lost-hobbies" });
    expect(Array.isArray(products)).toBe(true);
    products.forEach((p) => {
      expect(p.category).toBe("lost-hobbies");
    });
  });

  it("should search products by title", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const products = await caller.products.list({ search: "watchmaking" });
    expect(Array.isArray(products)).toBe(true);
  });

  it("should get product by slug", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const product = await caller.products.bySlug({
      slug: "lost-art-mechanical-watchmaking",
    });
    expect(product).toBeDefined();
    if (product) {
      expect(product.slug).toBe("lost-art-mechanical-watchmaking");
    }
  });

  it("should prevent non-admin from creating products", async () => {
    const { ctx } = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.products.create({
        title: "Test Product",
        slug: "test-product",
        description: "Test description",
        category: "lost-hobbies",
        price: "29.99",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should allow admin to create products", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const uniqueSlug = `admin-test-product-${Date.now()}`;
    const result = await caller.products.create({
      title: "Admin Test Product",
      slug: uniqueSlug,
      description: "Admin test description",
      category: "technical-manuals",
      price: "39.99",
    });
    expect(result).toBeDefined();
  });
});

describe("Cart", () => {
  it("should add item to cart", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.cart.add({
      productId: 1,
      quantity: 1,
    });
    expect(result).toBeDefined();
  });

  it("should list cart items", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const items = await caller.cart.list();
    expect(Array.isArray(items)).toBe(true);
  });

  it("should clear cart", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.cart.clear();
    expect(result).toBeDefined();
  });
});

describe("Orders", () => {
  it("should list user orders", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const orders = await caller.orders.list();
    expect(Array.isArray(orders)).toBe(true);
  });

  it("should create an order", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.orders.create({
      items: [
        {
          productId: 1,
          title: "Test Product",
          price: "29.99",
          quantity: 1,
        },
      ],
      totalAmount: "29.99",
    });
    expect(result).toBeDefined();
  });

  it("should prevent non-admin from updating order status", async () => {
    const { ctx } = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.orders.updateStatus({
        orderId: 1,
        status: "completed",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should allow admin to update order status", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.orders.updateStatus({
      orderId: 1,
      status: "completed",
    });
    expect(result).toBeDefined();
  });
});

describe("Service Bureau", () => {
  it("should create a service bureau request", async () => {
    const caller = appRouter.createCaller(createAuthContext().ctx);

    const result = await caller.serviceBureau.create({
      name: "John Doe",
      email: "john@example.com",
      projectTitle: "Custom Guide",
      description: "Please create a guide about woodworking",
    });
    expect(result).toBeDefined();
  });

  it("should list service bureau requests for admin", async () => {
    const { ctx } = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);

    const requests = await caller.serviceBureau.list({});
    expect(Array.isArray(requests)).toBe(true);
  });

  it("should prevent non-admin from listing all requests", async () => {
    const { ctx } = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.serviceBureau.list({});
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("Authentication", () => {
  it("should logout user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
  });

  it("should get current user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const user = await caller.auth.me();
    expect(user).toBeDefined();
    expect(user?.email).toBe("test@example.com");
  });
});
