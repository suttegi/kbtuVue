import { ref } from 'vue';
import type { Task } from '@/types/task';

export function useTaskEdit(
  getTask: () => Task,
  onSave: (changes: Pick<Task, 'title' | 'description'>) => void,
) {
  const editing = ref(false);
  const draftTitle = ref('');
  const draftDescription = ref('');

  function startEdit() {
    draftTitle.value = getTask().title;
    draftDescription.value = getTask().description;
    editing.value = true;
  }

  function saveEdit() {
    if (!draftTitle.value.trim()) return;
    onSave({ title: draftTitle.value.trim(), description: draftDescription.value });
    editing.value = false;
  }

  function cancelEdit() {
    editing.value = false;
  }

  return { editing, draftTitle, draftDescription, startEdit, saveEdit, cancelEdit };
}
