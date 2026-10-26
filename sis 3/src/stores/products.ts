import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api, errorMessage } from '@/api/client';
import type { Product } from '@/types/product';

const FIELDS = 'title,description,category,price,rating,stock,thumbnail';

export const useProductsStore = defineStore('products', () => {
  const items = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref('');

  async function fetchAll(force = false) {
    if (items.value.length && !force) return;
    loading.value = true;
    error.value = '';
    try {
      const { data } = await api.get<{ products: Product[] }>('/products/category/groceries', {
        params: { limit: 0, select: FIELDS },
      });
      items.value = data.products;
    } catch (e) {
      error.value = errorMessage(e);
    } finally {
      loading.value = false;
    }
  }

  async function fetchOne(id: number): Promise<Product> {
    const cached = items.value.find((p) => p.id === id);
    if (cached) return cached;
    const { data } = await api.get<Product>(`/products/${id}`, { params: { select: FIELDS } });
    return data;
  }

  return { items, loading, error, fetchAll, fetchOne };
});
