import { computed, ref, type Ref } from 'vue';
import type { Task, StatusFilter, PriorityFilter } from '@/types/task';

export function useTaskFilters(tasks: Ref<Task[]>) {
  const search = ref('');
  const status = ref<StatusFilter>('all');
  const priority = ref<PriorityFilter>('all');

  const filtered = computed(() => {
    const query = search.value.trim().toLowerCase();
    return tasks.value.filter((task) => {
      if (status.value === 'active' && task.completed) return false;
      if (status.value === 'completed' && !task.completed) return false;
      if (priority.value !== 'all' && task.priority !== priority.value) return false;
      return task.title.toLowerCase().includes(query);
    });
  });

  return { search, status, priority, filtered };
}
