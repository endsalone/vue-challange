<template>
  <li class="w-full">
    <a
      href="#"
      class="inline-block p-4 w-full text-gray-900 bg-gray-700 text-white"
      data-testid="v-tab-option"
      @click="active"
    >
      <slot />
    </a>
  </li>
</template>
<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: "v-tabs-options",
  inheritAttrs: true,
  data() {
    return {
      activeClass: "bg-gray-900",
    };
  },
  mounted() {
    const elements = document.querySelectorAll("[data-testid='v-tab-option']");

    elements.forEach((el, index) => {
      if (index === 0 && elements.length === 1) {
        el.classList.add("rounded-lg", this.activeClass);
      }
      if (index === 0) {
        el.classList.add("rounded-l-lg", this.activeClass);
      }
      if (index === elements.length - 1) {
        el.classList.add("rounded-r-lg");
      }
    });
  },
  methods: {
    active(e: MouseEvent) {
      const activeElement = document.querySelector(`a.${this.activeClass}`);
      if (activeElement) {
        activeElement.classList.remove(this.activeClass);
      }

      (e.target! as HTMLElement).classList.add(this.activeClass);
    },
  },
};
</script>
