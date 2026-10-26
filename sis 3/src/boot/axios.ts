import { defineBoot } from '#q-app';
import { api, isUnauthorized } from '@/api/client';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

export default defineBoot(({ store, router }) => {
  const auth = useAuthStore(store);
  const cart = useCartStore(store);

  api.interceptors.request.use((config) => {
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  });

  api.interceptors.response.use(undefined, (error: unknown) => {
    if (isUnauthorized(error) && auth.token) {
      auth.logout();
      cart.reset();
      if (router.currentRoute.value.meta.requiresAuth) {
        void router.push('/login');
      }
    }
    throw error;
  });
});
