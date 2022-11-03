<template>
  <div class="px-5 py-5" data-testid="v-card-content">
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: "v-card-content",
  inheritAttrs: false,
};
</script>
