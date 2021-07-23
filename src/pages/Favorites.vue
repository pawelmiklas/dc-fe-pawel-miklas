<template>
  <AppHeader />
  <Table :data="data" :columns="columns">
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
import { defineComponent } from "vue";
import ActionButton from "../components/ActionButton.vue";
import Gender from "../components/Gender.vue";
import Table from "../components/Table.vue";
import { characterColumns } from "../utils/characterColumns";
import { useCharacters } from "../composable/useCharacters";
import { useLocalStorage } from "../composable/useLocalStorage";
import { LocalStorageKeys } from "../misc/localStorageKeys";
import AppHeader from "../components/AppHeader.vue";

export default defineComponent({
  name: "Favorites",
  setup() {
    const {
      selectedCharacters,
      isCharacterActive,
      toggleFavoriteCharacter,
    } = useCharacters();

    useLocalStorage(LocalStorageKeys.characters, selectedCharacters);

    return {
      columns: characterColumns,
      data: selectedCharacters,
      isCharacterActive,
      toggleFavoriteCharacter,
    };
  },
  components: { Table, Gender, ActionButton, AppHeader },
});
</script>
