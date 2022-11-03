<template>
  <main>
    <VCard sm>
      <VCardTitle>Participants</VCardTitle>
      <VCardContent>
        <VSearchInput
          type="text"
          placeholder="Participants URL..."
          :value="store.participantsUrl"
          :onSearch="onSearch"
        />
      </VCardContent>
    </VCard>
    <VTabs sm>
      <VTabsOptions @click="showGraph = true">Graph</VTabsOptions>
      <VTabsOptions @click="showGraph = false">Data</VTabsOptions>
    </VTabs>
    <VGraph md :lazyTrigger="store.participants" v-if="showGraph" :onLoad="generateDataChart" />
    <VGrid md :participants="store.participants" v-if="!showGraph" />
  </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useParticipantsStore } from "../stores/participants";

const VCard = defineAsyncComponent(() => import("../components/VCard.vue"));
const VCardTitle = defineAsyncComponent(() => import("../components/VCardTitle.vue"));
const VCardContent = defineAsyncComponent(() => import("../components/VCardContent.vue"));
const VTabs = defineAsyncComponent(() => import("../components/VTab.vue"));
const VTabsOptions = defineAsyncComponent(() => import("../components/VTabOption.vue"));
const VSearchInput = defineAsyncComponent(() => import("../components/VSearchInput.vue"));
const VGrid = defineAsyncComponent(() => import("../components/VGrid.vue"));
const VGraph = defineAsyncComponent(() => import("../components/VGraph.vue"));
</script>
<script lang="ts">
export default {
  data() {
    return {
      store: useParticipantsStore(),
      showGraph: true,
      chartData: {},
    };
  },
  methods: {
    async onSearch(url: string) {
      await this.store.loadParticipants(url);
    },
    generateDataChart() {
      const participantsResult = [...this.store.participants.values()];
      const participantsGrouped = new Map();

      for (const participant of participantsResult) {
        const key = participant?.apiFamilyType;
        if (!key) {
          continue;
        }

        if (participantsGrouped.has(key)) {
          participantsGrouped.get(key).push(participant);
        } else {
          participantsGrouped.set(key, [participant]);
        }
      }

      const chartData = {
        labels: [...participantsGrouped.keys()],
        datasets: [
          {
            label: "Participants",
            data: [...participantsGrouped.values()].map((x) => x.length),
            backgroundColor: [
              "#e6194b",
              "#3cb44b",
              "#ffe119",
              "#4363d8",
              "#f58231",
              "#911eb4",
              "#46f0f0",
              "#f032e6",
              "#bcf60c",
              "#fabebe",
              "#008080",
              "#e6beff",
              "#9a6324",
              "#fffac8",
              "#800000",
              "#aaffc3",
              "#808000",
              "#ffd8b1",
              "#000075",
              "#808080",
              "#ffffff",
              "#000000",
            ],
            hoverBackgroundColor: [
              "#e6194b",
              "#3cb44b",
              "#ffe119",
              "#4363d8",
              "#f58231",
              "#911eb4",
              "#46f0f0",
              "#f032e6",
              "#bcf60c",
              "#fabebe",
              "#008080",
              "#e6beff",
              "#9a6324",
              "#fffac8",
              "#800000",
              "#aaffc3",
              "#808000",
              "#ffd8b1",
              "#000075",
              "#808080",
              "#ffffff",
              "#000000",
            ],
          },
        ],
      };

      return chartData;
    },
  },
};
</script>
