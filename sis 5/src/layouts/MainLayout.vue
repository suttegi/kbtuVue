<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <span class="logo">todo</span>
      <a-button @click="toggle">change</a-button>
    </a-layout-header>

    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode';

const { toggle } = useDarkMode();
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.logo {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}

.content {
  padding: 24px 16px;
}
</style>
