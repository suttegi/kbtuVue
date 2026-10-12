<template>
  <q-form class="q-gutter-md" @submit="onSubmit">
    <q-input v-model="title" label="Title" outlined dense />
    <q-input v-model="description" label="Description" outlined dense />
    <q-select v-model="priority" :options="['low', 'medium', 'high']" label="Priority" outlined dense />
    <div>
    <q-input filled v-model="deadline" mask="date" :rules="['date']">
        <template #append>
        <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="deadline">
                <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
            </q-date>
            </q-popup-proxy>
        </q-icon>
        </template>
    </q-input>
    </div>
    <q-card-actions align="right">
      <q-btn type="submit" color="primary" label="Add" :disable="!title" />
    </q-card-actions>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { date } from 'quasar';

const today = () => date.formatDate(Date.now(), 'YYYY/MM/DD');

export default defineComponent({
  name: 'TaskForm',
  emits: ['add'],
  data() {
    return {
      title: '',
      description: '',
      priority: 'medium',
      deadline: today(),
    };
  },
  methods: {
    onSubmit() {
      this.$emit('add', {
        title: this.title,
        description: this.description,
        priority: this.priority,
        deadline: this.deadline
      });
      this.title = '';
      this.description = '';
      this.priority = 'medium';
      this.deadline = today();
    },
  },
});
</script>
