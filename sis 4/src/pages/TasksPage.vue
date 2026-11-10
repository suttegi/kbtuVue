<template>
  <div class="page-head">
    <h1 class="page-title">tasks</h1>
    <a-segmented v-model:value="filter" :options="filters" />
  </div>

  <ErrorState v-if="error" :message="error" @retry="run" />

  <a-table
    v-else
    row-key="id"
    :columns="columns"
    :data-source="filtered"
    :loading="loading"
    :pagination="{ pageSize: 10, showSizeChanger: false }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'student'">
        <router-link :to="{ name: 'student', params: { id: record.userId } }">
          student #{{ record.userId }}
        </router-link>
      </template>
      <template v-else-if="column.key === 'status'">
        <a-tag :color="record.completed ? 'green' : 'default'">
          {{ record.completed ? 'done' : 'open' }}
        </a-tag>
      </template>
    </template>
    <template #emptyText>
      <a-empty description="no tasks here" />
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ErrorState from '@/components/ErrorState.vue';
import { getTasks } from '@/api/students';
import { useRequest } from '@/composables/useRequest';

const { data, loading, error, run } = useRequest(getTasks);

const filters = ['all', 'open', 'done'];
const filter = ref('all');

const columns = [
  { title: 'task', dataIndex: 'todo' },
  { title: 'student', key: 'student', width: 140 },
  { title: 'status', key: 'status', width: 100 },
];

const filtered = computed(() => {
  const list = data.value ?? [];
  if (filter.value === 'all') return list;
  return list.filter((t) => t.completed === (filter.value === 'done'));
});

onMounted(run);
</script>
