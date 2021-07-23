<template>
  <AppHeader @onSearch="handleSearch" />
  <div class="info" v-if="error">oops something went wrong</div>
  <template v-else>
    <Table
      :data="data"
      :columns="columns"
      :loading="loading"
      :page="page"
      :pages="pages"
      withPagination
      @paginationChange="onPaginationChange"
    >
      <template #image="{ value }">
        <img class="character-photo" :src="value.image" />
      </template>
      <template #gender="{ value }">
        <Gender :gender="value.gender" />
      </template>
      <template #episode="{ value }">
        {{ value.episode[value.episode.length - 1].episode }}
      </template>
      <template #action="{ value }">
        <ActionButton
          @click="toggleFavoriteCharacter(value)"
          :isActive="isCharacterActive(value)"
        />
      </template>
    </Table>
  </template>
</template>

<script lang="ts">
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { defineComponent } from "vue";
import ActionButton from "../components/ActionButton.vue";
import AppHeader from "../components/AppHeader.vue";
import Gender from "../components/Gender.vue";
import Table from "../components/Table.vue";
import { useCharacters } from "../composable/useCharacters";
import { useFilter } from "../composable/useFilter";
import { useLocalStorage } from "../composable/useLocalStorage";
import { usePagination } from "../composable/usePagination";
import { LocalStorageKeys } from "../misc/localStorageKeys";
import { characterColumns } from "../utils/characterColumns";

export default defineComponent({
  name: "Home",
  setup() {
    const { filter, handleSearch } = useFilter();
    const { page, onPaginationChange } = usePagination();
    const { result, loading, error } = useQuery(
      gql`
        query getCharacters($page: Int, $filter: FilterCharacter) {
          characters(page: $page, filter: $filter) {
            info {
              pages
            }
            results {
              id
              name
              species
              gender
              episode {
                id
                episode
              }
              image
            }
          }
        }
      `,
      { page, filter },
      { fetchPolicy: "cache-and-network" }
    );

    const {
      selectedCharacters,
      isCharacterActive,
      toggleFavoriteCharacter,
    } = useCharacters();

    useLocalStorage(LocalStorageKeys.characters, selectedCharacters);

    const data = useResult(result, [], (data) => data.characters.results);
    const pages = useResult(result, 1, (data) => data.characters.info.pages);

    return {
      columns: characterColumns,
      page,
      data,
      pages,
      loading,
      isCharacterActive,
      toggleFavoriteCharacter,
      onPaginationChange,
      handleSearch,
      error,
    };
  },
  components: { Table, Gender, ActionButton, AppHeader },
});
</script>
