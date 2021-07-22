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
            <div class="search-input">
              <input type="text" class="input" />
              <Icon name="search" class="fas" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <br />
  <Table :data="data" :columns="columns">
    <template #image="{ value }">
      <img class="character-photo" :src="value.image" />
    </template>
    <template #gender="{ value }">
      <Gender :gender="value.gender" />
    </template>
  </Table>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Icon from "../components/Icon.vue";
import Table from "../components/Table.vue";
import Gender from "../components/Gender.vue";

type Filter = "Name" | "Identifier" | "Episode";

type Character = {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
};

const DATA = [
  {
    id: "1",
    name: "Rick Sanchez",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  {
    id: "2",
    name: "Morty Smith",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
  {
    id: "3",
    name: "Summer Smith",
    species: "Human",
    gender: "Female",
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  },
  {
    id: "4",
    name: "Beth Smith",
    species: "Human",
    gender: "Female",
    image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
  },
  {
    id: "5",
    name: "Jerry Smith",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
  },
  {
    id: "6",
    name: "Abadango Cluster Princess",
    species: "Alien",
    gender: "Female",
    image: "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
  },
  {
    id: "7",
    name: "Abradolf Lincler",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
  },
  {
    id: "8",
    name: "Adjudicator Rick",
    species: "Human",
    gender: "Male",
    image: "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
  },
];

export default defineComponent({
  name: "AppNavigation",
  setup() {
    const selectedFilter = ref<Filter>("Name");
    const page = ref(1);
    const filterOptions = ref<Filter[]>(["Name", "Identifier", "Episode"]);
    const isDropdownActive = ref(false);
    const navLink = computed<{ title: string }[]>(() => [
      { title: "All characters" },
      { title: "Favorites" },
    ]);

    const columns = computed(() => [
      {
        title: "Photo",
        dataIndex: "image",
        customRender: "image",
        // render: (character: Character) =>
        //   `<img class="character-photo" src=${character.image} />`,
      },
      {
        title: "Character ID",
        dataIndex: "id",
      },
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        customRender: "gender",
        // render: (character: Character) =>
        //   `<Gender gender=${character.gender} />`,
      },
      {
        title: "Species",
        dataIndex: "species",
      },
      // {
      //   title: "Last Episode",
      //   dataIndex: "species",
      // },
      // {
      //   title: "Add to Favorites",
      //   render: () => `<div>Dodaj</div>`,
      // },
    ]);

    const handleSelect = (filter: Filter) => {
      selectedFilter.value = filter;
    };

    const handleDropdownActive = () => {
      isDropdownActive.value = !isDropdownActive.value;
    };

    const paginate = () => {
      console.log("paginate");
    };

    return {
      navLink,
      selectedFilter,
      handleSelect,
      filterOptions,
      isDropdownActive,
      handleDropdownActive,
      page,
      paginate,
      columns,
      data: DATA,
    };
  },
  components: { Icon, Table, Gender },
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

.character-photo {
  width: 43px;
}
</style>
