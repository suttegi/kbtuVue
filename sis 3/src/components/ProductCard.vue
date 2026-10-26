<template>
  <router-link :to="`/product/${product.id}`" class="card">
    <div class="card__image">
      <img :src="product.thumbnail" :alt="product.title" />
    </div>
    <div class="card__body">
      <div class="card__title">{{ product.title }}</div>
      <div class="card__price">${{ product.price }}</div>
      <q-btn rounded no-caps color="primary" label="buy" to="/product/" />
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Product } from '@/types/product';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  overflow: hidden;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

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
  padding: 0 24px 28px;
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

.card__link {
  display: inline-block;
  margin-top: 12px;
  font-size: 15px;
  color: #0071e3;
}
</style>
