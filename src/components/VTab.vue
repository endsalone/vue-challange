<template>
  <div class="w-full flex flex-col items-center mb-10">
    <ul
      class="font-medium text-center flex dark:divide-gray-700 dark:text-gray-400 mx-5"
      :class="{ 'w-2/4': sm, 'w-3/4': md, 'w-4/5': lg, 'w-11/12': xl }"
      data-testid="v-tabs"
    >
      <slot />
    </ul>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  sm: {
    type: Boolean,
    default: false,
  },
  md: {
    type: Boolean,
    default: false,
  },
  lg: {
    type: Boolean,
    default: false,
  },
  xl: {
    type: Boolean,
    default: false,
  },
});
</script>

<script lang="ts">
export default {
  name: "v-tabs",
  inheritAttrs: true,
};
</script>
