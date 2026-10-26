<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="nav">
      <div class="container nav__inner">
        <router-link to="/" class="nav__logo">quan</router-link>

        <nav class="nav__links">
          <router-link to="/store" class="nav__link">store</router-link>
          <router-link to="/cart" class="nav__link">cart</router-link>
        </nav>

        <q-btn flat round dense size="sm" icon="person_outline" to="/login" color="secondary" />
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
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

@media (max-width: 600px) {
  .nav__links {
    gap: 16px;
  }
}
</style>
