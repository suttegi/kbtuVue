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

      <div v-if="store.loading" class="skeleton">
        <q-skeleton type="text" width="160px" height="40px" />
        <div class="skeleton__row">
          <div v-for="n in 4" :key="n" class="skeleton__card">
            <q-skeleton square class="skeleton__image" />
            <q-skeleton type="text" width="60%" class="q-mx-auto q-mt-md" />
            <q-skeleton type="text" width="30%" class="q-mx-auto" />
          </div>
        </div>
      </div>

      <div v-else-if="store.error" class="empty">
        <q-icon name="cloud_off" size="48px" color="accent" />
        <p class="subhead q-mt-md q-mb-none">couldn’t load products.</p>
        <p class="muted q-mt-sm">{{ store.error }}</p>
        <q-btn
          unelevated
          no-caps
          color="primary"
          label="try again"
          class="pill q-mt-md"
          @click="store.fetchAll(true)"
        />
      </div>

      <template v-else>
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
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ProductCarousel from '@/components/ProductCarousel.vue';
import { categories, categoryOf } from '@/data/categories';
import { useProductsStore } from '@/stores/products';

const store = useProductsStore();
const search = ref('');

onMounted(() => store.fetchAll());

const sections = computed(() => {
  const query = search.value.trim().toLowerCase();
  const found = store.items.filter((p) => p.title.toLowerCase().includes(query));
  return categories
    .map((category) => ({
      id: category.id,
      name: category.name,
      products: found.filter((p) => categoryOf(p.title) === category.name),
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

.skeleton {
  margin-top: 48px;
}

.skeleton__row {
  display: flex;
  gap: 20px;
  margin-top: 16px;
  overflow: hidden;
}

.skeleton__card {
  flex: 0 0 260px;
}

.skeleton__image {
  aspect-ratio: 1;
  height: auto;
  border-radius: 18px;
}
</style>
