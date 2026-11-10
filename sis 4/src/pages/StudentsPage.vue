<template>
  <div class="page-head">
    <h1 class="page-title">students</h1>
    <a-input-search
      v-model:value="query"
      placeholder="search by name"
      allow-clear
      class="search"
      @search="onSearch"
    />
  </div>

  <ErrorState v-if="error" :message="error" @retry="load" />

  <a-table
    v-else
    row-key="id"
    :columns="columns"
    :data-source="data?.items ?? []"
    :loading="loading"
    :pagination="{ current: page, pageSize: size, total: data?.total ?? 0, showSizeChanger: false }"
    :custom-row="(row: Student) => ({ onClick: () => open(row.id) })"
    :scroll="{ x: 640 }"
    class="table"
    @change="onChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <div class="person">
          <a-avatar :src="record.image" />
          <span>{{ record.firstName }} {{ record.lastName }}</span>
        </div>
      </template>
    </template>
    <template #emptyText>
      <a-empty description="no students found" />
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { TablePaginationConfig } from 'ant-design-vue';
import ErrorState from '@/components/ErrorState.vue';
import { getStudents } from '@/api/students';
import { useRequest } from '@/composables/useRequest';
import type { Student } from '@/types/student';

const router = useRouter();
const { data, loading, error, run } = useRequest(getStudents);

const page = ref(1);
const size = 10;
const query = ref('');

const columns = [
  { title: 'name', key: 'name' },
  { title: 'age', dataIndex: 'age', width: 80 },
  { title: 'email', dataIndex: 'email' },
  { title: 'university', dataIndex: 'university' },
];

function load() {
  return run(page.value, size, query.value.trim());
}

function onSearch() {
  page.value = 1;
  void load();
}

function onChange(pagination: TablePaginationConfig) {
  page.value = pagination.current ?? 1;
  void load();
}

function open(id: number) {
  void router.push({ name: 'student', params: { id } });
}

onMounted(load);
</script>

<style scoped lang="scss">
.search {
  width: 280px;
}

.table :deep(tbody tr) {
  cursor: pointer;
}

.person {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
