<template>
  <q-page class="q-pa-md q-gutter-md">
    <TaskForm @add="addTask" />
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" @toggle="toggleTask" @delete="deleteTask"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Task } from '@/types/task';
import TaskItem from '@/components/TaskItem.vue';
import TaskForm from '@/components/TaskForm.vue';

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      tasks: [] as Task[],
    };
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
  },
  components: { TaskItem, TaskForm },
});
</script>
