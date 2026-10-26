<template>
  <q-page class="store">
    <div class="container">
      <div class="store__head">
        <h1 class="headline q-ma-none">store.</h1>
        <q-input
          v-model="search"
          dense
          borderless
          clearable
          @clear="search = ''"
          placeholder="search products"
          class="search"
        >
          <template #prepend>
            <q-icon name="search" size="18px" />
          </template>
        </q-input>
      </div>

      <nav class="chips">
        <button
          v-for="section in sections"
          :key="section.id"
          class="chip"
          @click="scrollTo(section.id)"
        >
          {{ section.name }}
        </button>
      </nav>

      <ProductCarousel
        v-for="section in sections"
        :id="section.id"
        :key="section.id"
        :title="section.name"
        :products="section.products"
      />

      <div v-if="!sections.length" class="empty">
        <p class="subhead q-ma-none">nothing found for “{{ search }}”.</p>
        <q-btn
          flat
          no-caps
          color="primary"
          label="clear search"
          class="q-mt-sm"
          @click="search = ''"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ProductCarousel from '@/components/ProductCarousel.vue';
import { products } from '@/data/products';
import { categories } from '@/data/categories';

const search = ref('');

const sections = computed(() => {
  const query = search.value.trim().toLowerCase();
  return categories
    .map((category) => ({
      id: category.id,
      name: category.name,
      products: products.filter(
        (p) => category.titles.includes(p.title) && p.title.toLowerCase().includes(query),
      ),
    }))
    .filter((section) => section.products.length > 0);
});

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
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

.empty {
  padding: 64px 0;
  text-align: center;
}
</style>
