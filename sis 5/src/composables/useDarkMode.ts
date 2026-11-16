import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { theme } from 'ant-design-vue';
import { useSettingsStore } from '@/stores/settings';

export function useDarkMode() {
  const { isDark } = storeToRefs(useSettingsStore());

  const toggle = () => {
    isDark.value = !isDark.value;
  };

  const themeConfig = computed(() => ({
    algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
  }));

  return { isDark, toggle, themeConfig };
}
