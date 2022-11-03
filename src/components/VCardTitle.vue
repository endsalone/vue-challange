<template>
  <h2
    class="text-2xl font-bold text-gray-800"
    :class="{ 'text-center': center, 'text-left': left, 'text-right': right }"
    data-testid="v-card-title"
  >
    <slot />
  </h2>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  center?: boolean;
  left?: boolean;
  right?: boolean;
}>();
</script>
<script lang="ts">
export default {
  name: "v-card-title",
  inheritAttrs: true,
};
</script>
