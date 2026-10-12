<template>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ task.title }}</div>
        <div>{{ task.description }}</div>
      </q-card-section>

      <q-card-section>
        <q-badge :color="priorityColor(task.priority)">{{ task.priority }}</q-badge>
        <q-icon :name="task.completed ? 'done' : 'close'" />
        {{ task.completed ? 'completed' : 'active' }}
        {{ new Date(task.createdAt).toLocaleString() }}
        <span v-if="task.deadline">deadline: {{ task.deadline }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          color="green"
          :label="task.completed ? 'undo' : 'complete'"
          @click="$emit('toggle', task.id)"
        />
        <q-btn flat color="red" label="delete" @click="$emit('delete', task.id)" />
      </q-card-actions>
    </q-card>
</template>

<script lang='ts'>
import { defineComponent, type PropType } from 'vue';
import type { Task, Priority } from '@/types/task'
export default defineComponent({
    name:'TaskItem',
    props: {
        task: {type: Object as PropType<Task>, required: true}
    },
    emits: ['toggle', 'delete'],
    methods:{
        priorityColor(priority: Priority): string {
        if (priority === 'high') return 'red';
        if (priority === 'medium') return 'orange';
        return 'green';
        },
    },
})
</script>