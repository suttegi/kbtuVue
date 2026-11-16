<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>todo</q-toolbar-title>
        <q-btn color="primary" icon="build" label="change" @click="toggle" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode';

const { toggle } = useDarkMode();
</script>
