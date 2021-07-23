<template>
  <AppHeader @onSearch="handleSearch" />
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
import { computed, defineComponent } from "vue";
import ActionButton from "../components/ActionButton.vue";
import AppHeader from "../components/AppHeader.vue";
import Gender from "../components/Gender.vue";
import Table from "../components/Table.vue";
import { useCharacters } from "../composable/useCharacters";
import { useFilter } from "../composable/useFilter";
import { useLocalStorage } from "../composable/useLocalStorage";
import { LocalStorageKeys } from "../misc/localStorageKeys";
import { characterColumns } from "../utils/characterColumns";
import { Filter } from "../components/AppHeader.vue";

export default defineComponent({
  name: "Favorites",
  setup() {
    const { filter, handleSearch } = useFilter();

    const {
      selectedCharacters,
      isCharacterActive,
      toggleFavoriteCharacter,
    } = useCharacters();

    useLocalStorage(LocalStorageKeys.characters, selectedCharacters);

    const filteredCharacters = computed(() => {
      if (Object.keys(filter.value).length) {
        return selectedCharacters.value.filter((character) =>
          character[Object.keys(filter.value)[0] as Filter]
            .toLowerCase()
            .includes(Object.values(filter.value)[0].toLowerCase())
        );
      }

      return selectedCharacters.value;
    });

    return {
      columns: characterColumns,
      data: filteredCharacters,
      isCharacterActive,
      toggleFavoriteCharacter,
      handleSearch,
    };
  },
  components: { Table, Gender, ActionButton, AppHeader },
});
</script>
