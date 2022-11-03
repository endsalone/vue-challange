<template>
  <div class="w-full flex flex-col items-center" data-testid="v-card">
    <div
      class="bg-white shadow-md rounded-lg my-10 drop-shadow-xl p-8 flex flex-col justify-center"
      :class="{
        'sm:w-11/12': sm,
        'md:w-3/5': sm,
        'lg:w-2/4': sm,
        'w-3/4': md,
        'w-4/5': lg,
        'w-11/12': xl,
      }"
    >
      <slot />
    </div>
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
  name: "v-card",
  inheritAttrs: false,
};
</script>
