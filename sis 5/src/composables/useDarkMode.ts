import { useQuasar } from 'quasar';

export function useDarkMode() {
  const $q = useQuasar();

  const toggle = () => $q.dark.toggle();

  return { toggle };
}
