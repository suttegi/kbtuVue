<template>
  <q-form class="q-gutter-y-md" @submit="submit">
    <q-input v-model="form.title" label="Title" outlined dense />
    <q-input v-model="form.description" label="Description" outlined dense />
    <q-select v-model="form.priority" :options="priorities" label="Priority" outlined dense />
    <div>
    <q-input v-model="form.deadline" label="deadline" mask="date" :rules="['date']" outlined dense>
        <template #append>
        <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="form.deadline">
                <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
            </q-date>
            </q-popup-proxy>
        </q-icon>
        </template>
    </q-input>
    </div>
    <q-btn type="submit" color="primary" label="add" class="full-width" :disable="!form.title" />
  </q-form>
</template>

<script setup lang="ts">
import { useTaskForm, type TaskPayload } from '@/composables/useTaskForm';
import { usePriority } from '@/composables/usePriority';

const emit = defineEmits<{ add: [payload: TaskPayload] }>();

const { priorities } = usePriority();
const { form, submit } = useTaskForm((payload) => emit('add', payload));
</script>
