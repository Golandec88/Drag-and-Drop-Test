<template>
  <section class="app">
    <h3 class="app-result__title">Список тем обращения и продуктов</h3>
    <app-chip> Найденно 4 </app-chip>
    <app-tree-table :items="items" @drag="items = $event" />
  </section>
</template>
<script setup lang="ts">
import AppTreeTable from "@/components/tree-table/tree-table.component.vue";
import AppChip from "@/components/shared/chip/chip.component.vue";
import data from "@data/items.json";
import { ref } from "vue";

const items = ref(data.items);
</script>
<style lang="scss" src="./app.style.scss" scoped />
