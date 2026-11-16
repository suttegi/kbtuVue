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

<script lang='ts'>
import { defineComponent, type PropType } from 'vue';
import type { Task, Priority } from '@/types/task'
export default defineComponent({
    name:'TaskItem',
    data() {
        return{
            editing: false,
            draftTitle: '',
            draftDescription: '',
            priorities: ['low', 'medium', 'high'] as Priority[],
        }
    },
    props: {
        task: {type: Object as PropType<Task>, required: true}
    },
    emits: ['toggle', 'delete', 'update', 'change-priority'],
    methods:{
        priorityColor(priority: Priority): string {
        if (priority === 'high') return 'red';
        if (priority === 'medium') return 'orange';
        return 'green';
        },
        startEdit() {
            this.draftTitle = this.task.title;
            this.draftDescription = this.task.description;
            this.editing = true;
        },
        saveEdit() {
            if (!this.draftTitle) return;
            this.$emit('update', this.task.id, {
                title: this.draftTitle,
                description: this.draftDescription,
            });
            this.editing = false;
        },
        cancelEdit() {
            this.editing = false;
        },
    },
})
</script>

<style scoped>
.done .title {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
