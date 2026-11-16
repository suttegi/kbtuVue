<template>
  <a-space wrap>
    <a-input v-model:value="search" placeholder="search by title" allow-clear />
    <a-segmented v-model:value="status" :options="statusOptions" />
    <a-select v-model:value="priority" :options="priorityOptions" style="width: 120px" />
  </a-space>
</template>

<script setup lang="ts">
import type { StatusFilter, PriorityFilter } from '@/types/task';

const search = defineModel<string>('search', { required: true });
const status = defineModel<StatusFilter>('status', { required: true });
const priority = defineModel<PriorityFilter>('priority', { required: true });

const statusOptions = ['all', 'active', 'completed'];
const priorityOptions = ['all', 'low', 'medium', 'high'].map((value) => ({ value, label: value }));
</script>
