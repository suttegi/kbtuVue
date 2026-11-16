import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import type { Task, Priority } from '@/types/task';

const STORAGE_KEY = 'tasks';

const load = (): Task[] => {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(data) ? (data as Task[]) : [];
  } catch {
    return [];
  }
};

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(load());

  const total = computed(() => tasks.value.length);
  const completed = computed(() => tasks.value.filter((t) => t.completed).length);
  const active = computed(() => total.value - completed.value);

  const find = (id: number) => tasks.value.find((t) => t.id === id);

  function add(payload: Pick<Task, 'title' | 'description' | 'priority' | 'deadline'>) {
    tasks.value.unshift({
      ...payload,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completed: false,
    });
  }

  function toggle(id: number) {
    const task = find(id);
    if (task) task.completed = !task.completed;
  }

  function update(id: number, changes: Partial<Omit<Task, 'id' | 'createdAt'>>) {
    const task = find(id);
    if (task) Object.assign(task, changes);
  }

  function setPriority(id: number, priority: Priority) {
    update(id, { priority });
  }

  function remove(id: number) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  watch(tasks, (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)), {
    deep: true,
  });

  return { tasks, total, completed, active, add, toggle, update, setPriority, remove };
});
