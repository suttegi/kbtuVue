<template>
  <q-page class="flex flex-center page">
    <div class="login">
      <div class="login__logo">quan</div>
      <h1 class="login__title">sign in to quan.</h1>

      <q-form greedy class="column q-gutter-md q-mt-lg" @submit="submit">
        <q-input
          v-model="username"
          outlined
          label="username"
          autocomplete="username"
          :rules="[(v: string) => !!v || 'enter your username']"
        />
        <q-input
          v-model="password"
          outlined
          type="password"
          label="password"
          autocomplete="current-password"
          :rules="[(v: string) => v.length >= 4 || 'at least 4 characters']"
        />
        <div v-if="error" class="error">{{ error }}</div>
        <q-btn
          unelevated
          no-caps
          color="primary"
          label="continue"
          class="pill q-mt-lg"
          :loading="loading"
          type="submit"
        />
      </q-form>

      <p class="muted login__hint">demo account: emilys / emilyspass</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { errorMessage } from '@/api/client';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const cart = useCartStore();

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function submit() {
  error.value = '';
  loading.value = true;
  try {
    await auth.login(username.value.trim(), password.value);
  } catch (e) {
    error.value = errorMessage(e);
    return;
  } finally {
    loading.value = false;
  }
  void cart.load();
  const redirect = route.query.redirect;
  const safe =
    typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//');
  await router.push(safe ? redirect : '/store');
}
</script>

<style scoped lang="scss">
.page {
  padding: 64px 22px;
}

.login {
  width: 100%;
  max-width: 380px;
  text-align: center;
}

.login__logo {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.login__title {
  margin: 16px 0 0;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.error {
  color: #ff3b30;
  font-size: 14px;
}

.login__hint {
  margin-top: 24px;
  font-size: 13px;
}
</style>
