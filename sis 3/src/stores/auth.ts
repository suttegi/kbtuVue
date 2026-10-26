import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { api } from '@/api/client';
import type { User } from '@/types/user';

const TOKEN_KEY = 'quan-token';
const USER_KEY = 'quan-user';

interface LoginResponse extends User {
  accessToken: string;
}

const pickUser = (data: User): User => ({
  id: data.id,
  username: data.username,
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  image: data.image,
});

const loadUser = (): User | null => {
  try {
    const data = JSON.parse(localStorage.getItem(USER_KEY) ?? 'null') as Partial<User> | null;
    return typeof data?.id === 'number' && typeof data.firstName === 'string'
      ? (data as User)
      : null;
  } catch {
    return null;
  }
};

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));
  const user = ref<User | null>(token.value ? loadUser() : null);

  const isLoggedIn = computed(() => token.value !== null && user.value !== null);

  async function login(username: string, password: string) {
    const { data } = await api.post<LoginResponse>('/auth/login', {
      username,
      password,
      expiresInMins: 60,
    });
    token.value = data.accessToken;
    user.value = pickUser(data);
  }

  async function fetchMe() {
    const { data } = await api.get<User>('/auth/me');
    user.value = pickUser(data);
  }

  function logout() {
    token.value = null;
    user.value = null;
  }

  watch(token, (value) => {
    if (value) localStorage.setItem(TOKEN_KEY, value);
    else localStorage.removeItem(TOKEN_KEY);
  });

  watch(user, (value) => {
    if (value) localStorage.setItem(USER_KEY, JSON.stringify(value));
    else localStorage.removeItem(USER_KEY);
  });

  return { token, user, isLoggedIn, login, fetchMe, logout };
});
