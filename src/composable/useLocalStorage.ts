import { onBeforeMount, watch, Ref } from "vue";

const useLocalStorage = <T>(key: string, ref: Ref<T>) => {
  onBeforeMount(() => {
    const value = window.localStorage.getItem(key);

    if (value) {
      ref.value = JSON.parse(value);
    }
  });

  watch(ref, () => {
    window.localStorage.setItem(key, JSON.stringify(ref.value));
  });

  return {};
};

export { useLocalStorage };
