import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getShipping: () => number;
  getTotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const existing = get().items.find((item) => item.id === product.id);
        set({
          items: existing
            ? get().items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            : [...get().items, { ...product, quantity: 1 }],
        });
      },

      removeFromCart: (id) =>
        set({ items: get().items.filter((item) => item.id !== id) }),

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          set({ items: get().items.filter((item) => item.id !== id) });
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getShipping: () => {
        const subtotal = get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        return subtotal > 50 ? 0 : 4.99;
      },

      getTotal: () => {
        const subtotal = get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const shipping = subtotal > 50 ? 0 : 4.99;
        return subtotal + shipping;
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
