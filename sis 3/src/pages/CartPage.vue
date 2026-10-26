<template>
  <q-page class="container page">
    <h1 class="headline q-mt-none q-mb-sm">your bag.</h1>

    <div v-if="!cart.items.length" class="empty">
      <p class="subhead q-ma-none">your bag is empty.</p>
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="continue shopping"
        class="pill q-mt-lg"
        to="/store"
      />
    </div>

    <template v-else>
      <p class="muted q-mb-xl">free delivery on all orders.</p>

      <div class="items">
        <div v-for="item in cart.items" :key="item.product.id" class="item">
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
            <q-btn
              round
              flat
              dense
              size="sm"
              icon="remove"
              @click="cart.decrement(item.product.id)"
            />
            <span class="qty__value">{{ item.quantity }}</span>
            <q-btn round flat dense size="sm" icon="add" @click="cart.increment(item.product.id)" />
          </div>

          <div class="item__total">${{ (item.product.price * item.quantity).toFixed(2) }}</div>

          <q-btn
            flat
            no-caps
            dense
            color="primary"
            label="remove"
            @click="cart.remove(item.product.id)"
          />
        </div>
      </div>

      <div class="summary">
        <div class="summary__row">
          <span class="muted">items</span>
          <span>{{ cart.count }}</span>
        </div>
        <div class="summary__row">
          <span class="muted">delivery</span>
          <span>free</span>
        </div>
        <div class="summary__row summary__row--total">
          <span>total</span>
          <span>${{ cart.total.toFixed(2) }}</span>
        </div>

        <div class="row justify-end q-gutter-sm q-mt-lg">
          <q-btn flat no-caps color="primary" label="continue shopping" class="pill" to="/store" />
          <q-btn
            unelevated
            no-caps
            color="primary"
            label="check out"
            class="pill"
            @click="checkout"
          />
        </div>
      </div>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { auth } from '@/services/auth';
import { cart } from '@/services/cart';

const router = useRouter();

async function checkout() {
  if (!auth.isLoggedIn) {
    await router.push({ name: 'login', query: { redirect: '/cart' } });
    return;
  }
  const total = cart.total.toFixed(2);
  cart.clear();
  await router.push({ name: 'success', query: { total } });
}
</script>

<style scoped lang="scss">
.page {
  padding-top: 56px;
  padding-bottom: 96px;
}

.empty {
  padding: 48px 0;
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
