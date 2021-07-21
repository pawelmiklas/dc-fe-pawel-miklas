<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="content-wrapper">
        <Icon name="logo" />
        <div class="search">
          <div class="search-wrapper">
            <div class="info">Search by</div>
            <div class="select" @click="handleDropdownActive">
              <div>{{ selectedFilter }}</div>
              <ul :class="{ active: isDropdownActive }">
                <li
                  v-for="filter in filterOptions"
                  :key="filter"
                  @click="handleSelect(filter)"
                >
                  {{ filter }}
                </li>
              </ul>
            </div>
            <div class="search">
              <input type="text" class="input" />
              <Icon name="search" class="fas" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import ClickOutside from "vue-click-outside";
import Icon from "../components/Icon.vue";
type Filter = "Name" | "Identifier" | "Episode";

export default defineComponent({
  name: "AppNavigation",
  setup() {
    const selectedFilter = ref<Filter>("Name");
    const filterOptions = ref<Filter[]>(["Name", "Identifier", "Episode"]);
    const isDropdownActive = ref(false);
    const navLink = computed<{ title: string }[]>(() => [
      { title: "All characters" },
      { title: "Favorites" },
    ]);

    const handleSelect = (filter: Filter) => {
      selectedFilter.value = filter;
    };

    const handleDropdownActive = () => {
      isDropdownActive.value = !isDropdownActive.value;
    };

    return {
      navLink,
      selectedFilter,
      handleSelect,
      filterOptions,
      isDropdownActive,
      handleDropdownActive,
    };
  },
  directives: { ClickOutside },
  components: { Icon },
});
</script>

<style lang="scss">
.navbar {
  height: 135px;
  width: 100%;
  background-color: $white;

  &-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid $gray-light;
    height: 100%;
  }
}

.search {
  padding-left: 80px;

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
      min-width: 125px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .select {
      min-width: 130px;
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
    .search {
      width: 100%;
      height: 100%;
      position: relative;

      .input {
        width: 100%;
        height: 100%;
        border: 0;
        padding: 0 56px 0 16px;
        border-radius: 10px;
      }

      svg {
        height: 32px;
        position: absolute;
        top: 11px;
        right: 15px;
        font-size: 22px;
        color: $main;
        cursor: pointer;
      }
    }
  }
}

.content-wrapper {
  padding: 0 140px;
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
