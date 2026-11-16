<template>
  <BaseCard :class="{ done: task.completed }">
    <div v-if="editing" class="edit">
      <a-input v-model:value="draftTitle" placeholder="title" @press-enter="saveEdit" />
      <a-textarea v-model:value="draftDescription" placeholder="description" :auto-size="{ minRows: 2 }" />
    </div>
    <div v-else class="head">
      <a-checkbox :checked="task.completed" @change="emit('toggle', task.id)" />
      <div class="body">
        <a-typography-text strong class="title">{{ task.title }}</a-typography-text>
        <div v-if="task.description">
          <a-typography-text type="secondary">{{ task.description }}</a-typography-text>
        </div>
      </div>
      <a-dropdown :trigger="['click']">
        <a-tag :color="priorityColor(task.priority)" class="priority">{{ task.priority }}</a-tag>
        <template #overlay>
          <a-menu
            :selected-keys="[task.priority]"
            @click="({ key }: { key: Priority }) => emit('change-priority', task.id, key)"
          >
            <a-menu-item v-for="p in priorities" :key="p">{{ p }}</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <a-space class="meta" wrap>
      <a-typography-text type="secondary">{{ task.completed ? 'completed' : 'active' }}</a-typography-text>
      <a-typography-text type="secondary">created: {{ new Date(task.createdAt).toLocaleString() }}</a-typography-text>
      <a-typography-text v-if="task.deadline" type="secondary">deadline: {{ task.deadline }}</a-typography-text>
    </a-space>

    <template #actions>
      <template v-if="editing">
        <a-button type="link" @click="cancelEdit">cancel</a-button>
        <a-button type="link" :disabled="!draftTitle.trim()" @click="saveEdit">save</a-button>
      </template>
      <template v-else>
        <a-button type="link" @click="emit('toggle', task.id)">
          {{ task.completed ? 'undo' : 'complete' }}
        </a-button>
        <a-button type="link" @click="startEdit">edit</a-button>
        <a-popconfirm title="delete this task?" @confirm="emit('delete', task.id)">
          <a-button type="link" danger>delete</a-button>
        </a-popconfirm>
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
.head {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.body {
  flex: 1;
}

.edit {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.priority {
  cursor: pointer;
}

.meta {
  margin-top: 12px;
  font-size: 12px;
}

.done .title {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
