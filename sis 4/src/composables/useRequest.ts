import { ref, shallowRef } from 'vue';
import { errorMessage } from '@/api/client';

export function useRequest<T, A extends unknown[] = []>(fn: (...args: A) => Promise<T>) {
  const data = shallowRef<T | null>(null);
  const loading = ref(false);
  const error = ref('');
  let lastCall = 0;

  async function run(...args: A) {
    const call = ++lastCall;
    loading.value = true;
    error.value = '';
    try {
      const result = await fn(...args);
      if (call === lastCall) data.value = result;
    } catch (e) {
      if (call === lastCall) error.value = errorMessage(e);
    } finally {
      if (call === lastCall) loading.value = false;
    }
  }

  return { data, loading, error, run };
}
