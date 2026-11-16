import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const isDark = ref(localStorage.getItem('dark') === 'true');

  watch(isDark, (value) => localStorage.setItem('dark', String(value)));

  return { isDark };
});
