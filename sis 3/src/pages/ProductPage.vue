<template>
  <q-page class="container page">
    <router-link to="/store" class="back">‹ store</router-link>

    <div class="product">
      <div class="product__image">
        <img :src="product.thumbnail" :alt="product.title" />
      </div>

      <div class="product__info">
        <div class="product__category">{{ category }}</div>
        <h1 class="product__title">{{ product.title }}</h1>
        <div class="product__price">${{ product.price }}</div>
        <p class="product__description">{{ product.description }}</p>

        <div class="product__meta">
          <div>
            <div class="muted">rating</div>
            <div class="product__meta-value">★ {{ product.rating }}</div>
          </div>
          <div>
            <div class="muted">in stock</div>
            <div class="product__meta-value">{{ product.stock }}</div>
          </div>
        </div>

        <div class="row q-gutter-sm q-mt-xl">
          <q-btn unelevated no-caps color="primary" label="add to bag" class="pill" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { products } from '@/data/products';
import { categoryOf } from '@/data/categories';

export default defineComponent({
  name: 'ProductPage',
  data() {
    return {
      product: products[0]!,
    };
  },
  computed: {
    category(): string {
      return categoryOf(this.product.title);
    },
  },
});
</script>

<style scoped lang="scss">
.page {
  padding-top: 32px;
  padding-bottom: 96px;
}

.back {
  font-size: 15px;
  color: #0071e3;
}

.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-top: 24px;
}

.product__image {
  aspect-ratio: 1;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.product__info {
  align-self: center;
}

.product__category {
  font-size: 12px;
  color: #bf4800;
}

.product__title {
  margin: 8px 0 0;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.015em;
}

.product__price {
  margin-top: 12px;
  font-size: 21px;
}

.product__description {
  margin-top: 24px;
  font-size: 17px;
  line-height: 1.5;
  color: #6e6e73;
}

.product__meta {
  display: flex;
  gap: 48px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #d2d2d7;
  font-size: 14px;
}

.product__meta-value {
  margin-top: 4px;
  font-size: 21px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .product {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .product__title {
    font-size: 36px;
  }
}
</style>
