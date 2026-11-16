<template>
  <a-config-provider :theme="themeConfig">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode';

const { themeConfig } = useDarkMode();
</script>
