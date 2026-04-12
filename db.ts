import { eq, desc, and, like, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, products, orders, orderItems, cartItems, serviceBureauRequests } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Product queries
export async function getProducts(filters?: { category?: string; search?: string; featured?: boolean }) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [eq(products.active, true)];

  if (filters?.category) {
    conditions.push(eq(products.category, filters.category as any));
  }
  if (filters?.search) {
    conditions.push(like(products.title, `%${filters.search}%`));
  }
  if (filters?.featured) {
    conditions.push(eq(products.featured, true));
  }

  return await db.select().from(products).where(and(...conditions)).orderBy(desc(products.createdAt));
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProduct(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(products).values(data);
  return result;
}

export async function updateProduct(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.delete(products).where(eq(products.id, id));
}

// Cart queries
export async function getCartItems(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select({
      id: cartItems.id,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      product: products,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.userId, userId));
}

export async function addToCart(userId: number, productId: number, quantity: number = 1) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)))
    .limit(1);

  if (existing.length > 0) {
    return await db
      .update(cartItems)
      .set({ quantity: existing[0].quantity + quantity })
      .where(eq(cartItems.id, existing[0].id));
  }

  return await db.insert(cartItems).values({ userId, productId, quantity });
}

export async function removeFromCart(userId: number, cartItemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.delete(cartItems).where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, userId)));
}

export async function clearCart(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.delete(cartItems).where(eq(cartItems.userId, userId));
}

// Order queries
export async function createOrder(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(orders).values(data);
  return result;
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
}

export async function updateOrderStatus(orderId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.update(orders).set({ status: status as any }).where(eq(orders.id, orderId));
}

// Order items queries
export async function createOrderItem(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(orderItems).values(data);
}

export async function getOrderItems(orderId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

export async function updateOrderItemDownloadUrl(itemId: number, downloadUrl: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.update(orderItems).set({ downloadUrl }).where(eq(orderItems.id, itemId));
}

// Service Bureau queries
export async function createServiceBureauRequest(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.insert(serviceBureauRequests).values(data);
}

export async function getServiceBureauRequests(filters?: { status?: string }) {
  const db = await getDb();
  if (!db) return [];

  const conditions = filters?.status ? [eq(serviceBureauRequests.status, filters.status as any)] : undefined;

  return await db
    .select()
    .from(serviceBureauRequests)
    .where(conditions ? and(...conditions) : undefined)
    .orderBy(desc(serviceBureauRequests.createdAt));
}

export async function getServiceBureauRequestById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(serviceBureauRequests).where(eq(serviceBureauRequests.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateServiceBureauRequest(id: number, data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  return await db.update(serviceBureauRequests).set(data).where(eq(serviceBureauRequests.id, id));
}
