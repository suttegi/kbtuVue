<template>
  <BaseCard title="stats">
    <div class="row text-center q-mb-md">
      <div class="col">
        <div class="text-h5">{{ total }}</div>
        <div class="text-caption text-grey">total</div>
      </div>
      <div class="col">
        <div class="text-h5 text-primary">{{ active }}</div>
        <div class="text-caption text-grey">active</div>
      </div>
      <div class="col">
        <div class="text-h5 text-positive">{{ completed }}</div>
        <div class="text-caption text-grey">completed</div>
      </div>
    </div>
    <q-linear-progress :value="progress" color="positive" size="6px" rounded />
  </BaseCard>
</template>

<script setup lang="ts">
import { useTaskStats } from '@/composables/useTaskStats';

const { total, active, completed, progress } = useTaskStats();
</script>
