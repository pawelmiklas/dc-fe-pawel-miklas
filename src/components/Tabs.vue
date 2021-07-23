<template>
  <div class="tabs-wrapper">
    <div v-for="item in items" :key="item.title" class="tab">
      <router-link :to="item.path" custom v-slot="{ href, navigate, isActive }">
        <span
          class="tab-text"
          :class="{ 'tab-text-active': isActive }"
          :href="href"
          @click="navigate"
        >
          {{ item.title }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Tabs",
  props: {
    items: {
      type: Array as PropType<{ title: string; path: string }[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.tabs-wrapper {
  display: flex;
  align-items: center;
  height: 78px;
  font-weight: 500;
  color: $gray;

  @media (max-width: $lg) {
    width: 100%;
    justify-content: space-evenly;
  }
}

.tab {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 80px;
  cursor: pointer;

  @media (max-width: $lg) {
    margin: 0;
  }

  &-text {
    border-bottom: 3px solid transparent;
    text-decoration: none;

    &-active {
      color: $main;
      border-bottom: 3px solid $main;
    }
  }
}
</style>
