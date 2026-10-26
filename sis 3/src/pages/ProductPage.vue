<template>
  <q-page class="container page">
    <router-link to="/store" class="back">‹ store</router-link>

    <div v-if="loading" class="product">
      <q-skeleton square class="product__image" />
      <div class="product__info">
        <q-skeleton type="text" width="80px" />
        <q-skeleton type="text" width="70%" height="64px" />
        <q-skeleton type="text" width="100px" />
        <q-skeleton type="text" class="q-mt-lg" />
        <q-skeleton type="text" width="80%" />
      </div>
    </div>

    <div v-else-if="error" class="not-found">
      <q-icon name="cloud_off" size="48px" color="accent" />
      <p class="subhead q-mt-md q-mb-none">couldn’t load this product.</p>
      <p class="muted q-mt-sm">{{ error }}</p>
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="try again"
        class="pill q-mt-md"
        @click="load"
      />
    </div>

    <div v-else-if="!product" class="not-found">
      <p class="subhead q-ma-none">this product doesn’t exist.</p>
      <q-btn flat no-caps color="primary" label="back to store" class="q-mt-sm" to="/store" />
    </div>

    <div v-else class="product">
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

        <div class="row items-center q-gutter-md q-mt-xl">
          <q-btn
            unelevated
            no-caps
            color="primary"
            label="add to bag"
            class="pill"
            @click="addToBag"
          />
          <router-link v-if="inBag" to="/cart" class="in-bag"
            >{{ inBag }} in your bag ›</router-link
          >
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { errorMessage, isNotFound } from '@/api/client';
import { categoryOf } from '@/data/categories';
import { useCartStore } from '@/stores/cart';
import { useProductsStore } from '@/stores/products';
import type { Product } from '@/types/product';

const route = useRoute();
const $q = useQuasar();
const cart = useCartStore();
const products = useProductsStore();

const product = ref<Product | null>(null);
const loading = ref(false);
const error = ref('');

async function load() {
  const id = Number(route.params.id);
  product.value = null;
  error.value = '';
  loading.value = false;
  if (!Number.isInteger(id) || id <= 0) return;

  loading.value = true;
  const isCurrent = () => id === Number(route.params.id);
  try {
    const data = await products.fetchOne(id);
    if (isCurrent()) product.value = data.category === 'groceries' ? data : null;
  } catch (e) {
    if (isCurrent() && !isNotFound(e)) error.value = errorMessage(e);
  } finally {
    if (isCurrent()) loading.value = false;
  }
}

watch(() => route.params.id, load, { immediate: true });

const category = computed(() => (product.value ? categoryOf(product.value.title) : ''));
const inBag = computed(() => (product.value ? (cart.find(product.value.id)?.quantity ?? 0) : 0));

function addToBag() {
  if (!product.value) return;
  cart.add(product.value);
  $q.notify({ message: `${product.value.title} added to bag`, color: 'secondary' });
}
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

.not-found {
  padding: 96px 0;
  text-align: center;
}

.in-bag {
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
