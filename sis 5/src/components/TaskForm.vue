<template>
  <a-form :model="form" layout="vertical" @finish="submit">
    <a-form-item label="title">
      <a-input v-model:value="form.title" />
    </a-form-item>
    <a-form-item label="description">
      <a-textarea v-model:value="form.description" :auto-size="{ minRows: 2 }" />
    </a-form-item>
    <a-form-item label="priority">
      <a-select v-model:value="form.priority" :options="priorityOptions" />
    </a-form-item>
    <a-form-item label="deadline">
      <a-date-picker v-model:value="form.deadline" value-format="YYYY-MM-DD" class="full" />
    </a-form-item>
    <a-button type="primary" html-type="submit" block :disabled="!form.title.trim()">add</a-button>
  </a-form>
</template>

<script setup lang="ts">
import { useTaskForm, type TaskPayload } from '@/composables/useTaskForm';
import { usePriority } from '@/composables/usePriority';

const emit = defineEmits<{ add: [payload: TaskPayload] }>();

const { priorities } = usePriority();
const priorityOptions = priorities.map((value) => ({ value, label: value }));
const { form, submit } = useTaskForm((payload) => emit('add', payload));
</script>

<style scoped>
.full {
  width: 100%;
}
</style>
