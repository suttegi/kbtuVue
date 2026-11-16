<template>
    <BaseCard :class="{ done: task.completed }">
      <template #header>
        <div v-if="editing" class="q-gutter-sm">
          <q-input v-model="draftTitle" label="title" dense outlined autofocus @keyup.enter="saveEdit" />
          <q-input v-model="draftDescription" label="description" type="textarea" autogrow dense outlined />
        </div>
        <div v-else class="row no-wrap items-start q-gutter-sm">
          <q-checkbox
            :model-value="task.completed"
            dense
            color="positive"
            @update:model-value="$emit('toggle', task.id)"
          />
          <div class="col">
            <div class="text-subtitle1 text-weight-medium title">{{ task.title }}</div>
            <div v-if="task.description" class="text-body2 text-grey-8">{{ task.description }}</div>
          </div>
          <q-badge :color="priorityColor(task.priority)" class="cursor-pointer q-px-sm q-py-xs">
            {{ task.priority }}
            <q-menu>
              <q-list dense>
                <q-item
                  v-for="p in priorities"
                  :key="p"
                  clickable
                  v-close-popup
                  :active="p === task.priority"
                  @click="$emit('change-priority', task.id, p)"
                >
                  <q-item-section>{{ p }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-badge>
        </div>
      </template>

      <div class="row items-center q-gutter-md text-caption text-grey-7">
        <span>
          <q-icon :name="task.completed ? 'done' : 'close'" />
          {{ task.completed ? 'completed' : 'active' }}
        </span>
        <span>created: {{ new Date(task.createdAt).toLocaleString() }}</span>
        <span v-if="task.deadline">deadline: {{ task.deadline }}</span>
      </div>

      <template #actions>
        <template v-if="editing">
          <q-btn flat no-caps label="cancel" @click="cancelEdit" />
          <q-btn flat no-caps color="primary" label="save" :disable="!draftTitle" @click="saveEdit" />
        </template>
        <template v-else>
          <q-btn
            flat
            no-caps
            color="positive"
            :label="task.completed ? 'undo' : 'complete'"
            @click="$emit('toggle', task.id)"
          />
          <q-btn flat no-caps label="edit" @click="startEdit" />
          <q-btn flat no-caps color="negative" label="delete" @click="$emit('delete', task.id)" />
        </template>
      </template>
    </BaseCard>
</template>

<script setup lang="ts">
import type { Task, Priority } from '@/types/task';
import { useTaskEdit } from '@/composables/useTaskEdit';
import { usePriority } from '@/composables/usePriority';

const props = defineProps<{ task: Task }>();

const emit = defineEmits<{
  toggle: [id: number];
  delete: [id: number];
  update: [id: number, changes: Pick<Task, 'title' | 'description'>];
  'change-priority': [id: number, priority: Priority];
}>();

const { priorities, priorityColor } = usePriority();
const { editing, draftTitle, draftDescription, startEdit, saveEdit, cancelEdit } = useTaskEdit(
  () => props.task,
  (changes) => emit('update', props.task.id, changes),
);
</script>

<style scoped>
.done .title {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
