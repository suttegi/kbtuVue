import { reactive, watch } from 'vue';
import type { CartItem } from '@/types/cart';
import type { Product } from '@/types/product';

const STORAGE_KEY = 'quan-cart';

const load = (): CartItem[] => {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(data) ? (data as CartItem[]) : [];
  } catch {
    return [];
  }
};

export const cart = reactive({
  items: load(),

  get count(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  find(id: number): CartItem | undefined {
    return this.items.find((item) => item.product.id === id);
  },

  add(product: Product) {
    const item = this.find(product.id);
    if (item) {
      if (item.quantity < product.stock) item.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  },

  increment(id: number) {
    const item = this.find(id);
    if (item && item.quantity < item.product.stock) item.quantity++;
  },

  decrement(id: number) {
    const item = this.find(id);
    if (!item) return;
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.remove(id);
    }
  },

  remove(id: number) {
    this.items = this.items.filter((item) => item.product.id !== id);
  },

  clear() {
    this.items = [];
  },
});

watch(
  () => cart.items,
  (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items)),
  { deep: true },
);
