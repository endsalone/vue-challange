<template>
  <div class="w-full" data-testid="v-search-box">
    <div class="relative text-gray-600 focus-within:text-gray-400">
      <input
        class="border-gray-300 w-full rounded-full shadow-sm focus:border-indigo-100 focus:ring focus:ring-indigo-100 focus:ring-opacity-20 pl-5 focus:bg-white"
        :class="{
          'bg-gray-50': isDisabled,
        }"
        data-testid="v-search-input"
        ref="input"
        autocomplete="off"
        @keydown.enter="search"
        :disabled="isDisabled"
        :type="type"
        :placeholder="placeholder"
        v-model="searchValue"
      />
      <span class="absolute inset-y-0 right-3 flex items-center">
        <button
          type="submit"
          class="p-1 focus:outline-none focus:shadow-outline"
          data-testid="v-search-edit-button"
          v-if="isDisabled"
          @click="toggleDisabled"
        >
          <PencilIcon class="w-6 h-6" />
        </button>
        <button
          type="button"
          class="p-1"
          v-if="!isDisabled && !loading"
          @click="search()"
          data-testid="v-search-button"
        >
          <MagnifyingGlassIcon class="w-6 h-6" />
        </button>
        <ArrowPathIcon class="w-6 h-6 animate-spin" v-if="loading" />
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import { PencilIcon, MagnifyingGlassIcon, ArrowPathIcon } from "@heroicons/vue/24/solid";

defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: true,
  },
  onSearch: {
    type: Function,
    default: () => {},
  },
});
</script>
<script lang="ts">
export default {
  name: "v-input",
  inheritAttrs: true,
  data() {
    return {
      isDisabled: ref(this.$props.disabled),
      loading: ref(true),
      searchValue: ref(this.$props.value),
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    toggleDisabled(): void {
      this.isDisabled = !this.isDisabled;
      if (!this.isDisabled) {
        this.$nextTick(() => {
          (this.$refs.input as HTMLElement).focus();
        });
      }
    },
    async search($event?: KeyboardEvent): Promise<void> {
      try {
        this.loading = true;
        const value = $event ? ($event.target as HTMLInputElement).value : this.searchValue;
        await this.$props.onSearch(value);
      } catch (error) {
        this.toggleDisabled();
        alert("Error loading participants; Enter a valid URL");
        this.searchValue = this.$props.value;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
