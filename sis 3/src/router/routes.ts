import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/pages/HomePage.vue') },
      { path: 'store', name: 'store', component: () => import('@/pages/StorePage.vue') },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('@/pages/ProductPage.vue'),
      },
      { path: 'login', name: 'login', component: () => import('@/pages/LoginPage.vue') },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/pages/CartPage.vue'),
      },
      {
        path: 'success',
        name: 'success',
        component: () => import('@/pages/SuccessPage.vue'),
        meta: { requiresAuth: true },
      },
      { path: ':catchAll(.*)*', component: () => import('@/pages/ErrorNotFound.vue') },
    ],
  },
];

export default routes;
