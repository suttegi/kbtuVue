<template>
  <section :id="id" class="carousel">
    <div class="carousel__head">
      <h3 class="carousel__title">{{ title }}</h3>
      <div class="carousel__arrows">
        <q-btn round flat dense icon="chevron_left" class="arrow" @click="scroll(-1)" />
        <q-btn round flat dense icon="chevron_right" class="arrow" @click="scroll(1)" />
      </div>
    </div>

    <div ref="track" class="carousel__track">
      <div v-for="product in products" :key="product.id" class="carousel__item">
        <ProductCard :product="product" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import type { Product } from '@/types/product';

defineProps<{
  id: string;
  title: string;
  products: Product[];
}>();

const track = useTemplateRef<HTMLElement>('track');

function scroll(direction: number) {
  if (!track.value) return;
  track.value.scrollBy({ left: direction * track.value.clientWidth * 0.8, behavior: 'smooth' });
}
</script>

<style scoped lang="scss">
.carousel {
  scroll-margin-top: 72px;
}

.carousel + .carousel {
  margin-top: 56px;
}

.carousel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.carousel__title {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.carousel__arrows {
  display: flex;
  gap: 8px;
}

.arrow {
  background: #e8e8ed;
  color: #1d1d1f;
}

.carousel__track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 8px 0 16px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.carousel__item {
  flex: 0 0 260px;
  scroll-snap-align: start;
}
</style>
