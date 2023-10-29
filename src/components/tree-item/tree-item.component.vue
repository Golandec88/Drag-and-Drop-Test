<template>
  <div
    class="tree-item"
    :class="{
      ['tree-item--' + (opened ? 'open' : 'closed')]: props.items?.length,
      'tree-item--root': props.root,
      'tree-item--has-sub': !props.root && props.items?.length,
      'tree-item--selected': selectedIndex === index,
    }"
    draggable="true"
    @dragstart.stop="
      setSelected(props);
      opened = false;
    "
    @dragend="
      putElement();
      setSelected(null);
    "
    @dragleave.stop="setTarget(index)"
  >
    <div class="item-area">
      <div class="tree-item__col">
        <p class="tree-item__title">№</p>
        <span>{{ props.index }}</span>
      </div>
      <div class="tree-item__col tree-item__col--category">
        <p class="tree-item__title">Название</p>
        <app-svg-icon :name="iconName" />
        <span>{{ props.name }}</span>
      </div>
      <div class="tree-item__col">
        <p class="tree-item__title">Очередность</p>
        <span>{{ props.order }}</span>
      </div>
      <div class="tree-item__col" v-if="props.items">
        <p class="tree-item__title">Подкатегории</p>
        <span v-for="sub in props.items" :key="sub?.name">
          {{ sub?.name }} /
        </span>
      </div>
      <div class="tree-item__col tree-item__col--actions">
        <app-spacer />
        <app-chip v-if="props.items">{{ props.items.length }}</app-chip>
        <app-button
          v-if="props.items"
          @click="opened = !opened"
          class="tree-item__dropdown-button"
          icon
        >
          <app-svg-icon name="arrow-down" />
        </app-button>
        <app-button class="tree-item__dots-button" icon color="secondary">
          <app-svg-icon name="dots" />
        </app-button>
      </div>
    </div>
    <transition name="dropdown">
      <div class="item-sub-list" v-show="opened" v-if="props.items">
        <tree-item.component
          v-for="(sub, subIndex) in props.items"
          @set-target="setTarget"
          @set-selected="setSelected"
          @put-element="putElement"
          :selected-index="selectedIndex"
          :key="sub.name"
          :name="sub.name"
          :index="index + '.' + (subIndex + 1).toString()"
          :order="subIndex + 1"
          :items="sub.items"
        />
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import AppSpacer from "@/components/shared/spacer/spacer.component.vue";
import AppChip from "@/components/shared/chip/chip.component.vue";
import AppButton from "@/components/shared/button/button.component.vue";
import AppSvgIcon from "@/components/shared/svg-icon/svg-icon.component.vue";
import { computed, defineProps, ref, withDefaults, defineEmits } from "vue";
import { TreeTableItem } from "@/components/tree-table/tree-table.types";

interface IProps extends TreeTableItem {
  index: string;
  order: number;
  root?: boolean;
  selectedIndex?: string | null;
}
const opened = ref(false);
const props = withDefaults(defineProps<IProps>(), {
  root: false,
});
const iconName = computed(() => (props.items ? "folder" : "file"));
const emit = defineEmits(["set-target", "set-selected", "put-element"]);

const setTarget = (to: string | null) => {
  emit("set-target", to);
};
const setSelected = (index: TreeTableItem | null) => {
  emit("set-selected", index);
};

const putElement = () => {
  emit("put-element");
};
</script>
<style lang="scss" src="./tree-item.style.scss"></style>
