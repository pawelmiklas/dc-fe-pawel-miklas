<template>
  <Table :data="data" :columns="columns" :loading="loading">
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
import { characterColumns } from "../utils/characterColumns";
import { LocalStorageKeys } from "../misc/localStorageKeys";

export default defineComponent({
  name: "Home",
  setup() {
    const { result, loading } = useQuery(gql`
      query getCharacters {
        characters {
          info {
            count
            pages
            next
            prev
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
    `);

    const {
      selectedCharacters,
      isCharacterActive,
      toggleFavoriteCharacter,
    } = useCharacters();

    useLocalStorage(LocalStorageKeys.characters, selectedCharacters);

    const data = useResult(result, [], (data) => data.characters.results);

    return {
      columns: characterColumns,
      data,
      loading,
      isCharacterActive,
      toggleFavoriteCharacter,
    };
  },
  components: { Table, Gender, ActionButton },
});
</script>
