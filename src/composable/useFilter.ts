import { computed, ref } from "vue";

const useFilter = () => {
  const filterBy = ref("");
  const filterValue = ref("");

  const handleSearch = (props: any) => {
    filterBy.value = props.filterBy;
    filterValue.value = props.filterValue;
  };

  const filter = computed(() =>
    filterBy.value ? { [filterBy.value]: filterValue.value } : {}
  );

  return { filter, handleSearch };
};

export { useFilter };
