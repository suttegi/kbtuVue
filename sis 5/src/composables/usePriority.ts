import type { Priority } from '@/types/task';

export function usePriority() {
  const priorities: Priority[] = ['low', 'medium', 'high'];

  const priorityColor = (priority: Priority) => {
    if (priority === 'high') return 'red';
    if (priority === 'medium') return 'orange';
    return 'green';
  };

  return { priorities, priorityColor };
}
