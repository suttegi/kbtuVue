<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg page-container">
      <div class="col-12 col-md-4">
        <div class="column q-gutter-md sticky">
          <TaskStats />
          <BaseCard title="new task">
            <TaskForm @add="store.add" />
          </BaseCard>
        </div>
      </div>

      <div class="col-12 col-md-8">
        <div class="column q-gutter-md">
          <BaseCard>
            <TaskFilters
              v-model:search="search"
              v-model:status="statusFilter"
              v-model:priority="priorityFilter"
            />
          </BaseCard>
          <TaskItem
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @toggle="store.toggle"
            @delete="store.remove"
            @update="store.update"
            @change-priority="store.setPriority"
          />
          <div v-if="!filteredTasks.length" class="text-grey text-center q-pa-xl">
            {{ store.total ? 'nothing matches the filters' : 'no tasks yet' }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useTasksStore } from '@/stores/tasks';
import TaskItem from '@/components/TaskItem.vue';
import TaskForm from '@/components/TaskForm.vue';
import TaskStats from '@/components/TaskStats.vue';
import TaskFilters, { type StatusFilter, type PriorityFilter } from '@/components/TaskFilters.vue';

const store = useTasksStore();

const search = ref('');
const statusFilter = ref<StatusFilter>('all');
const priorityFilter = ref<PriorityFilter>('all');

const filteredTasks = computed(() => {
  const query = search.value.trim().toLowerCase();
  return store.tasks.filter((task) => {
    if (statusFilter.value === 'active' && task.completed) return false;
    if (statusFilter.value === 'completed' && !task.completed) return false;
    if (priorityFilter.value !== 'all' && task.priority !== priorityFilter.value) return false;
    return task.title.toLowerCase().includes(query);
  });
});

watchEffect(() => {
  document.title = `tasks (${store.total})`;
});
</script>

<style scoped>
.page-container {
  max-width: 1100px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .sticky {
    position: sticky;
    top: 66px;
  }
}
</style>
