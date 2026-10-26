import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { Notify } from 'quasar';
import { api, errorMessage, isNotFound } from '@/api/client';
import { useAuthStore } from '@/stores/auth';
import type { CartItem } from '@/types/cart';
import type { Product } from '@/types/product';

const ITEMS_KEY = 'quan-cart';
const CART_ID_KEY = 'quan-cart-id';

interface ServerCart {
  id: number;
}

const loadItems = (): CartItem[] => {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(ITEMS_KEY) ?? '[]');
    return Array.isArray(data) ? (data as CartItem[]) : [];
  } catch {
    return [];
  }
};

const loadCartId = (): number | null => {
  const id = Number(localStorage.getItem(CART_ID_KEY));
  return Number.isInteger(id) && id > 0 ? id : null;
};

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadItems());
  const cartId = ref<number | null>(loadCartId());

  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  const find = (id: number) => items.value.find((item) => item.product.id === id);

  let queue: Promise<unknown> = Promise.resolve();

  function enqueue<T>(task: () => Promise<T>): Promise<T> {
    const run = queue.then(task);
    queue = run.catch(() => undefined);
    return run;
  }

  function sync() {
    return enqueue(pushToServer);
  }

  async function pushToServer() {
    const auth = useAuthStore();
    if (!auth.isLoggedIn || !auth.user) return;

    try {
      if (!items.value.length) {
        if (cartId.value) {
          await api.delete(`/carts/${cartId.value}`);
          cartId.value = null;
        }
        return;
      }

      const products = items.value.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));

      if (cartId.value) {
        try {
          await api.put(`/carts/${cartId.value}`, { merge: false, products });
          return;
        } catch (e) {
          if (!isNotFound(e)) throw e;
        }
      }

      const { data } = await api.post<ServerCart>('/carts/add', {
        userId: auth.user.id,
        products,
      });
      cartId.value = data.id;
    } catch (e) {
      Notify.create({ message: `couldn't sync your bag: ${errorMessage(e)}`, color: 'negative' });
    }
  }

  async function load() {
    const auth = useAuthStore();
    const user = auth.user;
    if (!user) return;
    const loaded = await enqueue(async () => {
      try {
        const { data } = await api.get<{ carts: ServerCart[] }>(`/carts/user/${user.id}`);
        cartId.value = data.carts[0]?.id ?? null;
        return true;
      } catch (e) {
        Notify.create({ message: `couldn't load your bag: ${errorMessage(e)}`, color: 'negative' });
        return false;
      }
    });
    if (loaded) await sync();
  }

  function add(product: Product) {
    const item = find(product.id);
    if (item) {
      if (item.quantity >= product.stock) return;
      item.quantity++;
    } else {
      items.value.push({ product, quantity: 1 });
    }
    void sync();
  }

  function increment(id: number) {
    const item = find(id);
    if (!item || item.quantity >= item.product.stock) return;
    item.quantity++;
    void sync();
  }

  function decrement(id: number) {
    const item = find(id);
    if (!item) return;
    if (item.quantity > 1) {
      item.quantity--;
      void sync();
    } else {
      remove(id);
    }
  }

  function remove(id: number) {
    items.value = items.value.filter((item) => item.product.id !== id);
    void sync();
  }

  function checkout() {
    return enqueue(async () => {
      if (cartId.value) {
        await api.delete(`/carts/${cartId.value}`);
      }
      items.value = [];
      cartId.value = null;
    });
  }

  function reset() {
    items.value = [];
    cartId.value = null;
  }

  watch(items, (value) => localStorage.setItem(ITEMS_KEY, JSON.stringify(value)), {
    deep: true,
  });

  watch(cartId, (value) => {
    if (value) localStorage.setItem(CART_ID_KEY, String(value));
    else localStorage.removeItem(CART_ID_KEY);
  });

  return {
    items,
    cartId,
    count,
    total,
    find,
    load,
    add,
    increment,
    decrement,
    remove,
    checkout,
    reset,
  };
});
