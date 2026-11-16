import { reactive } from 'vue';
import { date } from 'quasar';
import type { Task } from '@/types/task';

export type TaskPayload = Pick<Task, 'title' | 'description' | 'priority' | 'deadline'>;

const today = () => date.formatDate(Date.now(), 'YYYY-MM-DD');

const empty = (): TaskPayload => ({
  title: '',
  description: '',
  priority: 'medium',
  deadline: today(),
});

export function useTaskForm(onSubmit: (payload: TaskPayload) => void) {
  const form = reactive(empty());

  function reset() {
    Object.assign(form, empty());
  }

  function submit() {
    if (!form.title.trim()) return;
    onSubmit({ ...form, title: form.title.trim() });
    reset();
  }

  return { form, submit };
}
