<template>
  <q-page class="store">
    <div class="container">
      <div class="store__head">
        <h1 class="headline q-ma-none">store.</h1>
        <q-input v-model="search" dense borderless placeholder="search products" class="search">
          <template #prepend>
            <q-icon name="search" size="18px" />
          </template>
        </q-input>
      </div>

      <nav class="chips">
        <button
          v-for="category in categories"
          :key="category.id"
          class="chip"
          @click="scrollTo(category.id)"
        >
          {{ category.name }}
        </button>
      </nav>

      <ProductCarousel
        v-for="category in categories"
        :id="category.id"
        :key="category.id"
        :title="category.name"
        :products="products.filter((p) => category.titles.includes(p.title))"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCarousel from '@/components/ProductCarousel.vue';
import { products } from '@/data/products';
import { categories } from '@/data/categories';

export default defineComponent({
  name: 'StorePage',
  components: { ProductCarousel },
  data() {
    return {
      search: '',
      products,
      categories,
    };
  },
  methods: {
    scrollTo(id: string) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
  },
});
</script>

<style scoped lang="scss">
.store {
  padding: 56px 0 96px;
}

.store__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.search {
  width: 280px;
  background: #f5f5f7;
  border-radius: 12px;
  padding: 0 12px;
}

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 32px 0 48px;
}

.chip {
  border: 1px solid #d2d2d7;
  background: #fff;
  border-radius: 980px;
  padding: 8px 18px;
  font: inherit;
  font-size: 14px;
  color: #1d1d1f;
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;

  &:hover {
    background: #f5f5f7;
    border-color: #86868b;
  }
}
</style>
