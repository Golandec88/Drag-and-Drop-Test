<template>
  <button class="app-button" :class="buttonClasses">
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { computed, defineProps, withDefaults } from "vue";
interface IProps {
  color?: "primary" | "secondary";
  icon?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  color: "primary",
  icon: false,
});

const buttonClasses = computed(() => ({
  ["app-button--" + props.color]: true,
  ["app-button--icon"]: props.icon,
}));
</script>
<style lang="scss" scoped src="./button.style.scss"></style>
