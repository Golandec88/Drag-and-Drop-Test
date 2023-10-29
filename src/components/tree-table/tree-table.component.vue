<template>
  <section class="tree-table">
    <app-tree-item
      v-for="(item, index) of props.items"
      :key="item.name"
      :index="(index + 1).toString()"
      :order="index + 1"
      :name="item.name"
      :items="item.items"
      :selected-index="selected?.index"
      @set-target="setTarget"
      @set-selected="setSelected"
      @put-element="putElement"
      root
    />
  </section>
</template>
<script setup lang="ts">
import { defineProps, ref, defineEmits } from "vue";
import { TreeTableItem } from "./tree-table.types";
import AppTreeItem from "@/components/tree-item/tree-item.component.vue";

interface IProps {
  items: TreeTableItem[];
}

const emit = defineEmits(["drag"]);

const target = ref<string | null>();
const selected = ref<TreeTableItem | null>();
const setTarget = (index: string) => {
  target.value = index;
};
const setSelected = (el: TreeTableItem | null) => {
  selected.value = el;
};

const insertElement = (target: string, element: TreeTableItem) => {
  const path = Array.from(target.split("."), Number);
  const itemsCopy = Array.from(props.items);

  function findAndInsert(depth: number, result?: TreeTableItem[]) {
    if (!result) return [];
    if (depth > path.length) return result;

    if (path.length === 1) {
      result[path[0] - 1] = result.splice(
        result.findIndex((_, i) => i === +element.index - 1),
        1,
        result[path[0] - 1]
      )[0];

      return result;
    }
    if (result[path[depth] - 1].items) {
      const curr = result[path[depth] - 1]?.items;
      if (curr?.length && curr[path[depth + 1] - 1]?.items) {
        result[path[depth] - 1].items = findAndInsert(
          depth + 1,
          result[path[depth] - 1].items
        );
      } else if (result[path[depth] - 1].items?.length) {
        const elemPath = element.index.split(".");

        result[path[depth] - 1].items![path[depth + 1] - 1] = result[
          path[depth] - 1
        ].items!.splice(
          +elemPath[elemPath.length - 1] - 1,
          1,
          result[path[depth] - 1].items![path[depth + 1] - 1]
        )[0];
      }
    }
    return result;
  }

  return findAndInsert(0, itemsCopy);
};

const putElement = () => {
  if (!selected.value || !target.value) return;

  emit("drag", insertElement(target.value, selected.value));
};
const props = defineProps<IProps>();
</script>
<style lang="scss" src="./tree-table.style.scss" />
