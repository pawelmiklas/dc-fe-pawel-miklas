<template>
  <div class="tabsWrapper">
    <div v-for="item in items" :key="item.title" class="tab">
      <router-link :to="item.path" custom v-slot="{ href, navigate, isActive }">
        <NavLink
          class="tab-text"
          :class="{ 'tab-text-active': isActive }"
          :href="href"
          @click="navigate"
        >
          {{ item.title }}
        </NavLink>
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
.tabsWrapper {
  display: flex;
  align-items: center;
  height: 78px;
  font-weight: 500;
  color: $gray;
}

.tab {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 80px;
  cursor: pointer;

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
