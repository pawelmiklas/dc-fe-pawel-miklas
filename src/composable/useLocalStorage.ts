import { onBeforeMount, watch } from "vue";

const useLocalStorage = (key: string, ref: any) => {
  onBeforeMount(() => {
    const value = window.localStorage.getItem(key);

    if (value) {
      ref.value = JSON.parse(value);
    }
  });

  watch(ref, () => {
    window.localStorage.setItem(key, JSON.stringify(ref.value));
  });

  const clearStorage = (refValue: any) => {
    ref.value = refValue;
    window.localStorage.setItem(key, refValue);
  };

  return { clearStorage };
};

export { useLocalStorage };
