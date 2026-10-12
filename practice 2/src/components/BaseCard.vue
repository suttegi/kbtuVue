<template>
  <q-card flat bordered>
    <q-card-section v-if="title || $slots.header">
      <slot name="header">
        <div class="text-subtitle1 text-weight-medium">{{ title }}</div>
      </slot>
    </q-card-section>

    <q-card-section>
      <slot />
    </q-card-section>

    <q-card-actions v-if="$slots.actions" align="right">
      <slot name="actions" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseCard',
  props: {
    title: { type: String, default: '' },
  },
});
</script>
