<template>
  <BaseCard title="stats">
    <div class="row text-center q-mb-md">
      <div class="col">
        <div class="text-h5">{{ total }}</div>
        <div class="text-caption text-grey">total</div>
      </div>
      <div class="col">
        <div class="text-h5 text-primary">{{ active }}</div>
        <div class="text-caption text-grey">active</div>
      </div>
      <div class="col">
        <div class="text-h5 text-positive">{{ completed }}</div>
        <div class="text-caption text-grey">completed</div>
      </div>
    </div>
    <q-linear-progress :value="progress" color="positive" size="6px" rounded />
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Task } from '@/types/task';

export default defineComponent({
  name: 'TaskStats',
  props: {
    tasks: { type: Array as PropType<Task[]>, required: true },
  },
  computed: {
    total(): number {
      return this.tasks.length;
    },
    completed(): number {
      return this.tasks.filter((t) => t.completed).length;
    },
    active(): number {
      return this.total - this.completed;
    },
    progress(): number {
      return this.total ? this.completed / this.total : 0;
    },
  },
});
</script>
