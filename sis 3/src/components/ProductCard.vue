<template>
  <div class="card">
    <router-link :to="`/product/${product.id}`">
      <div class="card__image">
        <img :src="product.thumbnail" :alt="product.title" />
      </div>
      <div class="card__body">
        <div class="card__title">{{ product.title }}</div>
        <div class="card__price">${{ product.price }}</div>
      </div>
    </router-link>
    <div class="card__actions">
      <q-btn rounded no-caps color="primary" label="add to bag" @click="buy" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import type { Product } from '@/types/product';
import { cart } from '@/services/cart';

const props = defineProps<{ product: Product }>();
const $q = useQuasar();

function buy() {
  cart.add(props.product);
  $q.notify({ message: `${props.product.title} added to bag`, color: 'secondary' });
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
}

.card__image {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.card__body {
  padding: 0 24px;
  text-align: center;
}

.card__actions {
  padding: 12px 24px 28px;
  text-align: center;
}

.card__title {
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.card__price {
  margin-top: 4px;
  font-size: 15px;
  color: #6e6e73;
}
</style>
