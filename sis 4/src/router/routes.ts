import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'overview',
        component: () => import('@/pages/OverviewPage.vue'),
        meta: { title: 'overview' },
      },
      {
        path: 'students',
        name: 'students',
        component: () => import('@/pages/StudentsPage.vue'),
        meta: { title: 'students' },
      },
      {
        path: 'students/:id',
        name: 'student',
        component: () => import('@/pages/StudentPage.vue'),
        meta: { title: 'student' },
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('@/pages/TasksPage.vue'),
        meta: { title: 'tasks' },
      },
      {
        path: ':catchAll(.*)*',
        component: () => import('@/pages/ErrorNotFound.vue'),
        meta: { title: 'not found' },
      },
    ],
  },
];

export default routes;
