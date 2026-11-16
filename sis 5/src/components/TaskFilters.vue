<template>
  <div class="row items-center q-gutter-sm">
    <q-input
      v-model="search"
      placeholder="search by title"
      dense
      outlined
      clearable
      class="col-grow"
      @clear="search = ''"
    />

    <q-btn-toggle
      v-model="status"
      :options="statusOptions"
      toggle-color="primary"
      dense
      no-caps
      unelevated
    />

    <q-select
      v-model="priority"
      :options="priorityOptions"
      label="priority"
      dense
      outlined
      style="min-width: 120px"
    />
  </div>
</template>

<script setup lang="ts">
import type { StatusFilter, PriorityFilter } from '@/types/task';

const search = defineModel<string>('search', { required: true });
const status = defineModel<StatusFilter>('status', { required: true });
const priority = defineModel<PriorityFilter>('priority', { required: true });

const statusOptions = [
  { label: 'all', value: 'all' },
  { label: 'active', value: 'active' },
  { label: 'completed', value: 'completed' },
];
const priorityOptions = ['all', 'low', 'medium', 'high'];
</script>
