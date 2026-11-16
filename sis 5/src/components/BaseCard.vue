<template>
  <a-card :title="title || undefined">
    <template v-if="$slots.header" #title>
      <slot name="header" />
    </template>
    <slot />
    <template v-if="$slots.actions" #actions>
      <slot name="actions" />
    </template>
  </a-card>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>();
</script>
