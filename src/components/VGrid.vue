<template>
  <div class="w-full flex flex-col items-center" data-testid="v-grid">
    <ag-grid-vue
      class="ag-theme-alpine absolute"
      :class="{ 'w-2/4': sm, 'w-3/4': md, 'w-4/5': lg, 'w-11/12': xl }"
      :columnDefs="columnDefs"
      :rowData="participants"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      animateRows="true"
      domLayout="autoHeight"
      @grid-ready="onGridReady"
    >
    </ag-grid-vue>
  </div>
</template>
<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { reactive, defineProps, ref } from "vue";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import type { ColDef, ColGroupDef } from "ag-grid-community";

import type { ParticipantStore } from "@/stores/participants.type";
import notFoundImage from "@/assets/404.png";

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
  participants: {
    type: Array<ParticipantStore>,
  },
});

const imageCellRendered = (params: any) => {
  return `<img
    alt="${params.data.legalEntityName}"
    src="${params.data.imageUrl}"
    onerror="this.onerror=null; this.src='${notFoundImage}';"
    width="32">`;
};

const booleanCellRendered = (params: any) => {
  return `<input type='checkbox' ${params.value ? "checked" : ""} disabled>`;
};

const openLinkRendered = (params: any) => {
  return params.value
    ? `<a href="${params.value}" target="_blank"><u>${params.value}</u></a>`
    : null;
};

const columnDefs = ref<ColDef[] | ColGroupDef[]>([
  { field: "imageUrl", headerName: "", cellRenderer: imageCellRendered, minWidth: 80 },
  {
    field: "legalEntityName",
    headerName: "Legal Name",
    minWidth: 420,
    filter: "agTextColumnFilter",
  },
  { field: "apiFamilyType", headerName: "Type", filter: "agTextColumnFilter" },
  {
    field: "familyComplete",
    headerName: "Completed",
    minWidth: 130,
    width: 160,
    cellRenderer: booleanCellRendered,
    cellStyle: { "text-align": "center" },
    filter: "agTextColumnFilter",
  },
  { field: "apiCertificationUri", minWidth: 200, cellRenderer: openLinkRendered },
  { field: "apiResourceId" },
]);

const defaultColDef = reactive({
  flex: 1,
  minWidth: 150,
  sortable: true,
  resizable: true,
});

const onGridReady = (params: any) => {
  params.api.sizeColumnsToFit();
};
</script>
<script lang="ts">
export default {
  name: "v-grid",
  inheritAttrs: false,
};
</script>
