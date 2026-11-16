<template>
  <a-row :gutter="[24, 16]" class="page-container">
    <a-col :xs="24" :md="8">
      <a-space direction="vertical" size="middle" class="sticky">
        <TaskStats />
        <BaseCard title="new task">
          <TaskForm @add="store.add" />
        </BaseCard>
      </a-space>
    </a-col>

    <a-col :xs="24" :md="16">
      <a-space direction="vertical" size="middle" class="list">
        <BaseCard>
          <TaskFilters
            v-model:search="search"
            v-model:status="status"
            v-model:priority="priority"
          />
        </BaseCard>
        <TaskItem
          v-for="task in filtered"
          :key="task.id"
          :task="task"
          @toggle="store.toggle"
          @delete="store.remove"
          @update="store.update"
          @change-priority="store.setPriority"
        />
        <a-empty
          v-if="!filtered.length"
          :description="total ? 'nothing matches the filters' : 'no tasks yet'"
        />
      </a-space>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/tasks';
import { useTaskFilters } from '@/composables/useTaskFilters';
import TaskItem from '@/components/TaskItem.vue';
import TaskForm from '@/components/TaskForm.vue';
import TaskStats from '@/components/TaskStats.vue';
import TaskFilters from '@/components/TaskFilters.vue';

const store = useTasksStore();
const { tasks, total } = storeToRefs(store);
const { search, status, priority, filtered } = useTaskFilters(tasks);

watchEffect(() => {
  document.title = `tasks (${total.value})`;
});
</script>

<style scoped>
.page-container {
  max-width: 1100px;
  margin: 0 auto !important;
}

.sticky,
.list {
  width: 100%;
}

@media (min-width: 1024px) {
  .sticky {
    position: sticky;
    top: 24px;
  }
}
</style>
