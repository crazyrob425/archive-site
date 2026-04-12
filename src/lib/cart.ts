export interface CartItem {
  slug: string;
  quantity: number;
}

const CART_STORAGE_KEY = "cart";

function normalizeCartItem(item: any): CartItem | null {
  if (!item || typeof item.slug !== "string") {
    return null;
  }

  const quantity = Number(item.quantity);
  if (!Number.isFinite(quantity) || quantity < 1) {
    return null;
  }

  return {
    slug: item.slug,
    quantity: Math.floor(quantity),
  };
}

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map(normalizeCartItem).filter(Boolean) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function addItemToCart(slug: string, quantity = 1) {
  const cart = getCartItems();
  const normalizedQuantity = Math.max(1, Math.floor(quantity));
  const existing = cart.find((item) => item.slug === slug);

  if (existing) {
    existing.quantity += normalizedQuantity;
  } else {
    cart.push({ slug, quantity: normalizedQuantity });
  }

  saveCartItems(cart);
  return cart;
}

export function removeItemFromCart(slug: string) {
  const updated = getCartItems().filter((item) => item.slug !== slug);
  saveCartItems(updated);
  return updated;
}

export function clearCartItems() {
  saveCartItems([]);
}
