<template>
  <div class="row items-center q-gutter-sm">
    <q-input
      :model-value="search"
      placeholder="search by title"
      dense
      outlined
      clearable
      class="col-grow"
      @update:model-value="$emit('update:search', $event ?? '')"
    />

    <q-btn-toggle
      :model-value="status"
      :options="statusOptions"
      toggle-color="primary"
      dense
      no-caps
      unelevated
      @update:model-value="$emit('update:status', $event)"
    />

    <q-select
      :model-value="priority"
      :options="priorityOptions"
      label="priority"
      dense
      outlined
      style="min-width: 120px"
      @update:model-value="$emit('update:priority', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Priority } from '@/types/task';

export type StatusFilter = 'all' | 'active' | 'completed';
export type PriorityFilter = Priority | 'all';

export default defineComponent({
  name: 'TaskFilters',
  props: {
    search: { type: String, required: true },
    status: { type: String as PropType<StatusFilter>, required: true },
    priority: { type: String as PropType<PriorityFilter>, required: true },
  },
  emits: ['update:search', 'update:status', 'update:priority'],
  data() {
    return {
      statusOptions: [
        { label: 'all', value: 'all' },
        { label: 'active', value: 'active' },
        { label: 'completed', value: 'completed' },
      ],
      priorityOptions: ['all', 'low', 'medium', 'high'],
    };
  },
});
</script>
