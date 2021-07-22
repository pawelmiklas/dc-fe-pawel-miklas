<template>
  <div class="gender-wrapper">
    <Icon :name="genderIcon" />
    {{ gender }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import Icon, { Icons } from "./Icon.vue";
type Gender = "Male" | "Female" | "unknown";

const genderIcons: Record<Gender, Icons> = {
  Male: "male",
  Female: "female",
  unknown: "remove",
};

export default defineComponent({
  name: "Gender",
  props: {
    gender: {
      type: String as PropType<Gender>,
      required: true,
    },
  },
  setup(props) {
    const genderIcon = computed(() => genderIcons[props.gender]);

    return { genderIcon };
  },
  components: { Icon },
});
</script>

<style lang="scss">
.gender-wrapper {
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
}
</style>
