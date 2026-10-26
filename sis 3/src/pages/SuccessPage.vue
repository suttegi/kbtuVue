<template>
  <q-page class="flex flex-center page">
    <div class="success">
      <div class="success__icon">
        <q-icon name="check" size="40px" />
      </div>
      <h1 class="success__title">thank you, {{ auth.user?.firstName }}.</h1>
      <p v-if="total" class="muted q-mt-sm">total paid: ${{ total }}</p>

      <q-btn
        unelevated
        no-caps
        color="primary"
        label="continue shopping"
        class="pill q-mt-xl"
        to="/store"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const auth = useAuthStore();

const total = computed(() => (typeof route.query.total === 'string' ? route.query.total : ''));
</script>

<style scoped lang="scss">
.page {
  padding: 64px 22px;
}

.success {
  text-align: center;
}

.success__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #34c759;
  color: #fff;
}

.success__title {
  margin: 24px 0 0;
  font-size: 48px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
</style>
