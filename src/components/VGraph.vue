<template>
  <div class="w-full flex flex-col items-center" data-testid="v-graph">
    <Pie :chartData="chartData as typeof Chart.TChart" :height="600" :width="600" />
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { Pie } from "vue-chartjs";
import { Chart, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";

defineProps({
  lazyTrigger: {
    type: Object,
    required: false,
  },
  onLoad: {
    type: Function,
    default: () => {},
  },
});

Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
</script>
<script lang="ts">
export default {
  name: "v-graph",
  inheritAttrs: true,
  data() {
    return { chartData: {} };
  },
  unmounted() {
    this.chartData = {};
  },
  async mounted() {
    this.chartData = await this.$props.onLoad();
  },
  watch: {
    lazyTrigger: {
      handler() {
        this.chartData = this.$props.onLoad();
      },
      deep: true,
    },
  },
};
</script>
