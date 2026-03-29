"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "@/src/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  giftPackaging: boolean;
  giftMessage: string;
  setGiftPackaging: (v: boolean) => void;
  setGiftMessage: (v: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "twakka-cart";
const GIFT_STORAGE_KEY = "twakka-gift";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [giftPackaging, setGiftPackagingState] = useState(false);
  const [giftMessage, setGiftMessageState] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const giftStored = localStorage.getItem(GIFT_STORAGE_KEY);
      if (giftStored) {
        const { packaging, message } = JSON.parse(giftStored);
        setGiftPackagingState(packaging ?? false);
        setGiftMessageState(message ?? "");
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  // Persist gift state
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(
        GIFT_STORAGE_KEY,
        JSON.stringify({ packaging: giftPackaging, message: giftMessage })
      );
    }
  }, [giftPackaging, giftMessage, hydrated]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setGiftPackagingState(false);
    setGiftMessageState("");
  }, []);

  const setGiftPackaging = useCallback((v: boolean) => {
    setGiftPackagingState(v);
  }, []);

  const setGiftMessage = useCallback((v: string) => {
    setGiftMessageState(v);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        giftPackaging,
        giftMessage,
        setGiftPackaging,
        setGiftMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
