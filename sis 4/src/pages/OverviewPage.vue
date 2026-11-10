<template>
  <div class="page-head">
    <h1 class="page-title">overview</h1>
    <a-button :loading="loading" @click="run">refresh</a-button>
  </div>

  <ErrorState v-if="error" :message="error" @retry="run" />

  <template v-else>
    <a-row :gutter="[16, 16]">
      <a-col v-for="card in cards" :key="card.title" :xs="12" :md="6">
        <a-card :bordered="false">
          <a-statistic :title="card.title" :value="card.value" :loading="!data" />
        </a-card>
      </a-col>
    </a-row>

    <a-card title="task progress" :bordered="false" class="progress">
      <a-skeleton v-if="!data" active :paragraph="{ rows: 1 }" />
      <template v-else>
        <a-progress :percent="percent" />
        <a-typography-text type="secondary">
          {{ data.completed }} of {{ data.tasks }} tasks completed
        </a-typography-text>
      </template>
    </a-card>
  </template>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import ErrorState from '@/components/ErrorState.vue';
import { getStats } from '@/api/students';
import { useRequest } from '@/composables/useRequest';

const { data, loading, error, run } = useRequest(getStats);

const cards = computed(() => [
  { title: 'students', value: data.value?.students ?? 0 },
  { title: 'average age', value: data.value?.averageAge ?? 0 },
  { title: 'universities', value: data.value?.universities ?? 0 },
  { title: 'tasks', value: data.value?.tasks ?? 0 },
]);

const percent = computed(() =>
  data.value?.tasks ? Math.round((data.value.completed / data.value.tasks) * 100) : 0,
);

onMounted(run);
</script>

<style scoped lang="scss">
.progress {
  margin-top: 16px;
}
</style>
