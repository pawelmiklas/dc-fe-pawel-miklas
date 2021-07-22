<template>
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

<script lang="ts">
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { defineComponent } from "vue";
import ActionButton from "../components/ActionButton.vue";
import Gender from "../components/Gender.vue";
import Table from "../components/Table.vue";
import { useCharacters } from "../composable/useCharacters";
import { useLocalStorage } from "../composable/useLocalStorage";
import { usePagination } from "../composable/usePagination";
import { LocalStorageKeys } from "../misc/localStorageKeys";
import { characterColumns } from "../utils/characterColumns";

export default defineComponent({
  name: "Home",
  setup() {
    const { page, onPaginationChange } = usePagination();
    const { result, loading } = useQuery(
      gql`
        query getCharacters($page: Int) {
          characters(page: $page) {
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
      { page }
    );

    const {
      selectedCharacters,
      isCharacterActive,
      toggleFavoriteCharacter,
    } = useCharacters();

    useLocalStorage(LocalStorageKeys.characters, selectedCharacters);

    const data = useResult(result, [], (data) => data.characters.results);
    const pages = useResult(result, [], (data) => data.characters.info.pages);

    return {
      columns: characterColumns,
      page,
      data,
      pages,
      loading,
      isCharacterActive,
      toggleFavoriteCharacter,
      onPaginationChange,
    };
  },
  components: { Table, Gender, ActionButton },
});
</script>
