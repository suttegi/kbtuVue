<template>
  <a-layout class="layout">
    <a-layout-sider breakpoint="md" collapsed-width="0" theme="light">
      <div class="logo">wsp</div>
      <a-menu :selected-keys="selected" mode="inline" class="menu">
        <a-menu-item v-for="item in items" :key="item.name">
          <router-link :to="{ name: item.name }">{{ item.label }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const items = [
  { name: 'overview', label: 'overview' },
  { name: 'students', label: 'students' },
  { name: 'tasks', label: 'tasks' },
];

const selected = computed(() => {
  const name = String(route.name ?? '');
  return [name.startsWith('student') ? 'students' : name];
});
</script>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
}

.logo {
  padding: 24px 24px 16px;
  font-size: 20px;
  font-weight: 600;
}

.menu {
  border-inline-end: none !important;
}

.content {
  padding: 32px;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .content {
    padding: 48px 16px 24px;
  }
}
</style>
