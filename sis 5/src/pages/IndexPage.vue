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
          <div v-if="!filtered.length" class="text-grey text-center q-pa-xl">
            {{ total ? 'nothing matches the filters' : 'no tasks yet' }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
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
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .sticky {
    position: sticky;
    top: 66px;
  }
}
</style>
