<template>
  <q-page class="hero">
    <h1 class="hero__title">hello, alma.</h1>

    <img
      class="hero__image"
      src="https://cdn.dummyjson.com/product-images/groceries/apple/1.webp"
      alt="apple"
    />

    <div class="buy-bar">
      <div class="buy-bar__text">
        <div>from $1.99 per kg</div>
        <div class="muted">fresh, crisp and picked this week</div>
      </div>
      <q-btn unelevated no-caps color="primary" label="buy" class="pill" to="/product/16" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
});
</script>

<style scoped lang="scss">
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 22px 64px;
  text-align: center;
}
.hero__title {
  margin: 4px 0 0;
  font-size: 96px;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.04em;
}
.hero__image {
  width: min(640px, 90vw);
  margin: -40px 0 -56px;
}

.buy-bar {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 8px;
  padding: 12px 12px 12px 28px;
  background: #f5f5f7;
  border-radius: 980px;
  text-align: left;
  font-size: 14px;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .hero__title {
    font-size: 56px;
  }
}
</style>
