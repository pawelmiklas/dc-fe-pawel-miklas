<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="content-wrapper">
        <Icon name="logo" />
        <div class="search">
          <div class="search-wrapper">
            <div class="info">Search by</div>
            <div class="select" @click="handleDropdownActive">
              <div>{{ selectedFilter.title }}</div>
              <ul :class="{ active: isDropdownActive }">
                <li
                  v-for="filter in filterOptions"
                  :key="filter.value"
                  @click="handleSelect(filter)"
                >
                  {{ filter.title }}
                </li>
              </ul>
            </div>
            <div class="search-input">
              <input
                type="text"
                class="input"
                :value="search"
                @input="onSearch"
              />
              <Icon name="search" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="content-wrapper">
    <Tabs :items="navLink" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Icon from "../components/Icon.vue";
import Tabs from "../components/Tabs.vue";
import { debounce } from "../utils/debounce";

export enum Filter {
  name = "name",
  gender = "gender",
  species = "species",
}

type FilterOption = { value: Filter; title: string };

export default defineComponent({
  name: "AppNavigation",
  emits: ["onSearch"],
  setup(_, context) {
    const search = ref("");
    const selectedFilter = ref<FilterOption>({
      value: Filter.name,
      title: "Name",
    });
    const isDropdownActive = ref(false);
    const filterOptions = [
      { value: Filter.name, title: "Name" },
      { value: Filter.gender, title: "Gender" },
      { value: Filter.species, title: "Species" },
    ];
    const navLink = [
      { title: "All characters", path: "/" },
      { title: "Favorites", path: "/favorites" },
    ];

    const handleSelect = (filter: FilterOption) => {
      selectedFilter.value = filter;
      context.emit("onSearch", {
        filterBy: filter.value,
        filterValue: search.value,
      });
    };

    const handleDropdownActive = () => {
      isDropdownActive.value = !isDropdownActive.value;
    };

    const onSearch = debounce((e: Event) => {
      const target = e.target as HTMLInputElement;

      search.value = target.value;
      context.emit("onSearch", {
        filterBy: selectedFilter.value.value,
        filterValue: target.value,
      });
    }, 1000);

    return {
      navLink,
      selectedFilter,
      handleSelect,
      filterOptions,
      isDropdownActive,
      handleDropdownActive,
      search,
      onSearch,
    };
  },
  components: { Icon, Tabs },
});
</script>

<style lang="scss">
.navbar {
  min-height: 135px;
  height: 100%;
  width: 100%;
  background-color: $white;

  &-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid $gray-light;
    height: 100%;
    padding: 32px 0;
  }
}

.search {
  padding-left: 80px;

  @media (max-width: $lg) {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 24px 0 0 0;
  }

  &-wrapper {
    width: 505px;
    background: $white;
    border-radius: 10px;
    height: 56px;
    display: flex;
    border: 1px solid $gray;
    color: $gray;
    font-size: 16px;

    .info {
      max-width: 125px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .select {
      max-width: 130px;
      width: 100%;
      border-right: 1px solid $gray;
      border-left: 1px solid $gray;
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;

      ul {
        position: absolute;
        top: 38px;
        left: -1px;
        background: $white;
        width: 130px;
        padding: 0;
        display: none;

        li {
          padding-bottom: 10px;
          list-style-type: none;
          display: flex;
          align-items: center;
          border-bottom: 1px solid $gray;
          height: 54px;
          padding: 0 16px;

          &:last-child {
            border-bottom: 0;
          }

          &:hover {
            color: $gray-dark;
          }
        }
      }

      ul.active {
        z-index: 1;
        display: block;
        border: 1px solid $gray;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }

      &:before {
        content: "";
        position: absolute;
        top: 25px;
        right: 15px;
        border: 5px solid;
        border-color: $gray transparent transparent transparent;
      }
    }
    .search-input {
      width: 100%;
      height: 100%;
      position: relative;

      .input {
        width: 100%;
        height: 100%;
        border: 0;
        padding: 0 56px 0 16px;
        border-radius: 10px;
        color: $gray;
      }

      svg {
        height: 32px;
        position: absolute;
        top: 11px;
        right: 15px;
        font-size: 22px;
        color: $main;
      }
    }
  }
}

.content-wrapper {
  @include wrapperGutterLeft;
  @include wrapperGutterRight;
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: $lg) {
    flex-direction: column;
  }
}
</style>
