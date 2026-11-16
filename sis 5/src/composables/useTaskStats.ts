import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/tasks';

export function useTaskStats() {
  const { total, active, completed } = storeToRefs(useTasksStore());

  const progress = computed(() => (total.value ? completed.value / total.value : 0));

  return { total, active, completed, progress };
}
