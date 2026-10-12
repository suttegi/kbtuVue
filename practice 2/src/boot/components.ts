import { defineBoot } from '#q-app';
import BaseCard from '@/components/BaseCard.vue';

export default defineBoot(({ app }) => {
  app.component('BaseCard', BaseCard);
});
