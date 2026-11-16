<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>todo</q-toolbar-title>
        <q-btn color="primary" icon="build" label="change" @click="onClick" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  methods: {
    onClick() {
      this.$q.dark.toggle();
    },
  },
});
</script>
