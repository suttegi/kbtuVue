import { reactive, watch } from 'vue';
import type { User } from '@/types/user';

const STORAGE_KEY = 'quan-user';

const DEMO_USER = { username: 'emilys', password: 'emilyspass', firstName: 'emily' };

const load = (): User | null => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<User> | null;
    return typeof data?.username === 'string' && typeof data.firstName === 'string'
      ? { username: data.username, firstName: data.firstName }
      : null;
  } catch {
    return null;
  }
};

export const auth = reactive({
  user: load(),

  get isLoggedIn(): boolean {
    return this.user !== null;
  },

  login(username: string, password: string): boolean {
    if (username !== DEMO_USER.username || password !== DEMO_USER.password) {
      return false;
    }
    this.user = { username: DEMO_USER.username, firstName: DEMO_USER.firstName };
    return true;
  },

  logout() {
    this.user = null;
  },
});

watch(
  () => auth.user,
  (user) => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  },
);
