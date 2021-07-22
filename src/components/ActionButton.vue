<template>
  <button class="button" :class="{ 'button-active': isActive }">
    <Icon name="star" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Icon from "./Icon.vue";

export default defineComponent({
  name: "ActiveButton",
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  components: { Icon },
});
</script>

<style lang="scss">
.button {
  width: 43px;
  height: 43px;
  border-radius: 10px;
  background-color: transparent;
  display: grid;
  place-items: center;
  border: 2px solid $main;
  color: $main;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  &-active {
    background-color: $main;
    color: $white;
  }
}
</style>
