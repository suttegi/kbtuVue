<template>
  <q-page class="container page">
    <h1 class="headline q-mt-none q-mb-sm">your bag.</h1>
    <p class="muted q-mb-xl">free delivery on all orders.</p>

    <div class="items">
      <div v-for="item in items" :key="item.product.id" class="item">
        <router-link :to="`/product/${item.product.id}`" class="item__image soft-bg">
          <img :src="item.product.thumbnail" :alt="item.product.title" />
        </router-link>

        <div class="item__info">
          <router-link :to="`/product/${item.product.id}`" class="item__title">
            {{ item.product.title }}
          </router-link>
          <div class="muted">${{ item.product.price }} each</div>
        </div>

        <div class="qty">
          <q-btn round flat dense size="sm" icon="remove" />
          <span class="qty__value">{{ item.quantity }}</span>
          <q-btn round flat dense size="sm" icon="add" />
        </div>

        <div class="item__total">${{ (item.product.price * item.quantity).toFixed(2) }}</div>

        <q-btn flat no-caps dense color="primary" label="remove" />
      </div>
    </div>

    <div class="summary">
      <div class="summary__row">
        <span class="muted">subtotal</span>
        <span>${{ total }}</span>
      </div>
      <div class="summary__row">
        <span class="muted">delivery</span>
        <span>free</span>
      </div>
      <div class="summary__row summary__row--total">
        <span>total</span>
        <span>${{ total }}</span>
      </div>

      <div class="row justify-end q-gutter-sm q-mt-lg">
        <q-btn flat no-caps color="primary" label="continue shopping" class="pill" to="/store" />
        <q-btn unelevated no-caps color="primary" label="check out" class="pill" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { products } from '@/data/products';

export default defineComponent({
  name: 'CartPage',
  data() {
    return {
      items: [
        { product: products[0]!, quantity: 2 },
        { product: products[1]!, quantity: 1 },
        { product: products[14]!, quantity: 3 },
      ],
    };
  },
  computed: {
    total(): string {
      return this.items
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        .toFixed(2);
    },
  },
});
</script>

<style scoped lang="scss">
.page {
  padding-top: 56px;
  padding-bottom: 96px;
}

.items {
  border-top: 1px solid #d2d2d7;
}

.item {
  display: grid;
  grid-template-columns: 120px 1fr auto 100px auto;
  align-items: center;
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid #d2d2d7;
}

.item__image {
  display: flex;
  aspect-ratio: 1;
  border-radius: 12px;
  padding: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.item__title {
  display: block;
  font-size: 21px;
  font-weight: 600;
}

.qty {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty__value {
  min-width: 20px;
  text-align: center;
  font-size: 17px;
}

.item__total {
  text-align: right;
  font-size: 17px;
  font-weight: 600;
}

.summary {
  max-width: 400px;
  margin: 32px 0 0 auto;
}

.summary__row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 17px;

  &--total {
    margin-top: 8px;
    padding-top: 16px;
    border-top: 1px solid #d2d2d7;
    font-size: 24px;
    font-weight: 600;
  }
}

@media (max-width: 600px) {
  .item {
    grid-template-columns: 64px 1fr auto auto;
    gap: 12px;
  }

  .item__total {
    display: none;
  }
}
</style>
