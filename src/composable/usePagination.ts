import { ref } from "vue";

const usePagination = () => {
  const page = ref(1);

  const onPaginationChange = (newPage: number) => {
    page.value = newPage;
  };

  return { page, onPaginationChange };
};

export { usePagination };
