import type BaseCard from '@/components/BaseCard.vue';

declare module 'vue' {
  export interface GlobalComponents {
    BaseCard: typeof BaseCard;
  }
}

export {};
