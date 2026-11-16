<template>
  <BaseCard title="stats">
    <a-row class="stats">
      <a-col :span="8">
        <a-statistic title="total" :value="total" />
      </a-col>
      <a-col :span="8">
        <a-statistic title="active" :value="active" />
      </a-col>
      <a-col :span="8">
        <a-statistic title="completed" :value="completed" />
      </a-col>
    </a-row>
    <a-progress :percent="Math.round(progress * 100)" />
  </BaseCard>
</template>

<script setup lang="ts">
import { useTaskStats } from '@/composables/useTaskStats';

const { total, active, completed, progress } = useTaskStats();
</script>

<style scoped>
.stats {
  text-align: center;
  margin-bottom: 12px;
}
</style>
