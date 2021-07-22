import { Character } from "@/misc/types";
import { ref } from "vue";

const useCharacters = () => {
  const selectedCharacters = ref<Character[]>([]);

  const isCharacterActive = (character: Character) =>
    !!selectedCharacters.value.find(({ id }) => id === character.id);

  const toggleFavoriteCharacter = (character: Character) => {
    const isCharacterActive = selectedCharacters.value.find(
      ({ id }) => id === character.id
    );

    if (selectedCharacters.value.length >= 5 && !isCharacterActive) {
      return window.confirm("You can add up to 5 characters to favorites");
    }

    const newCharacters = isCharacterActive
      ? [...selectedCharacters.value.filter(({ id }) => id !== character.id)]
      : [...selectedCharacters.value, character];

    selectedCharacters.value = newCharacters;
  };

  return { selectedCharacters, isCharacterActive, toggleFavoriteCharacter };
};

export { useCharacters };
