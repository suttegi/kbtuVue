<template>
  <a-result status="warning" title="couldn't load data" :sub-title="message">
    <template #extra>
      <a-button type="primary" @click="emit('retry')">try again</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
defineProps<{ message: string }>();
const emit = defineEmits<{ retry: [] }>();
</script>
