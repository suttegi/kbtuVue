<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-lg page-container">
      <div class="col-12 col-md-4">
        <div class="column q-gutter-md sticky">
          <TaskStats :tasks="tasks" />
          <BaseCard title="new task">
            <TaskForm @add="addTask" />
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
            @toggle="toggleTask"
            @delete="deleteTask"
            @update="updateTask"
            @change-priority="changePriority"
          />
          <div v-if="!filteredTasks.length" class="text-grey text-center q-pa-xl">
            {{ tasks.length ? 'nothing matches the filters' : 'no tasks yet' }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Task, Priority } from '@/types/task';
import TaskItem from '@/components/TaskItem.vue';
import TaskForm from '@/components/TaskForm.vue';
import TaskStats from '@/components/TaskStats.vue';
import TaskFilters, { type StatusFilter, type PriorityFilter } from '@/components/TaskFilters.vue';

export default defineComponent({
  name: 'IndexPage',
  created() {
    const saved = localStorage.getItem('tasks');
    if (saved) this.tasks = JSON.parse(saved) as Task[];
  },
  mounted() {
    document.title = `tasks (${this.tasks.length})`;
  },
  data() {
    return {
      tasks: [] as Task[],
      search: '',
      statusFilter: 'all' as StatusFilter,
      priorityFilter: 'all' as PriorityFilter,
    };
  },
  computed: {
    filteredTasks(): Task[] {
      const query = this.search.trim().toLowerCase();
      return this.tasks.filter((task) => {
        if (this.statusFilter === 'active' && task.completed) return false;
        if (this.statusFilter === 'completed' && !task.completed) return false;
        if (this.priorityFilter !== 'all' && task.priority !== this.priorityFilter) return false;
        return task.title.toLowerCase().includes(query);
      });
    },
  },
  methods: {
    toggleTask(id: number) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.completed = !task.completed;
    },
    deleteTask(id: number) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
    },
    addTask(payload: Pick<Task, 'title' | 'description' | 'priority' | 'deadline'>) {
      this.tasks.unshift({
        ...payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        completed: false,
      });
    },
    updateTask(id: number, changes: Pick<Task, 'title' | 'description'>) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) Object.assign(task, changes);
    },
    changePriority(id: number, priority: Priority) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.priority = priority;
    },
  },
  watch: {
    tasks: {
      handler(value: Task[]) {
        localStorage.setItem('tasks', JSON.stringify(value));
      },
      deep: true,
    },
  },
  components: { TaskItem, TaskForm, TaskFilters, TaskStats },
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
