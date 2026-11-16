<template>
  <BaseCard title="stats">
    <div class="row text-center q-mb-md">
      <div class="col">
        <div class="text-h5">{{ store.total }}</div>
        <div class="text-caption text-grey">total</div>
      </div>
      <div class="col">
        <div class="text-h5 text-primary">{{ store.active }}</div>
        <div class="text-caption text-grey">active</div>
      </div>
      <div class="col">
        <div class="text-h5 text-positive">{{ store.completed }}</div>
        <div class="text-caption text-grey">completed</div>
      </div>
    </div>
    <q-linear-progress :value="progress" color="positive" size="6px" rounded />
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTasksStore } from '@/stores/tasks';

const store = useTasksStore();

const progress = computed(() => (store.total ? store.completed / store.total : 0));
</script>
