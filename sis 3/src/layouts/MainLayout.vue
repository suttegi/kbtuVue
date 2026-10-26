<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="nav">
      <div class="container nav__inner">
        <router-link to="/" class="nav__logo">quan</router-link>

        <nav class="nav__links">
          <router-link to="/store" class="nav__link">store</router-link>
          <router-link to="/cart" class="nav__link">
            cart<span v-if="cart.count">&nbsp;({{ cart.count }})</span>
          </router-link>
        </nav>

        <q-btn v-if="auth.user" flat dense no-caps size="sm" color="secondary" class="nav__user">
          hi, {{ auth.user.firstName }}
          <q-menu anchor="bottom right" self="top right" :offset="[0, 8]">
            <q-list dense style="min-width: 140px">
              <q-item v-close-popup clickable @click="logout">
                <q-item-section>sign out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn
          v-else
          flat
          round
          dense
          size="sm"
          icon="person_outline"
          to="/login"
          color="secondary"
        />
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { errorMessage, isUnauthorized } from '@/api/client';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const auth = useAuthStore();
const cart = useCartStore();

onMounted(async () => {
  if (!auth.token) return;
  try {
    await auth.fetchMe();
  } catch (e) {
    if (!isUnauthorized(e)) {
      $q.notify({ message: `couldn't reach the server: ${errorMessage(e)}`, color: 'negative' });
    }
    return;
  }
  await cart.load();
});

async function logout() {
  auth.logout();
  cart.reset();
  if (route.meta.requiresAuth) {
    await router.push('/login');
  }
}
</script>

<style scoped lang="scss">
.nav {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  color: #1d1d1f;
}

.nav__inner {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__logo {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.nav__links {
  display: flex;
  gap: 32px;
}

.nav__link {
  font-size: 12px;
  color: #1d1d1f;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover,
  &.router-link-exact-active {
    opacity: 1;
  }
}

.nav__user {
  font-size: 12px;
}

@media (max-width: 600px) {
  .nav__links {
    gap: 16px;
  }
}
</style>
