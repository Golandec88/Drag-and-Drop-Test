<template>
  <div
    class="app-svg-icon"
    v-html="
      require('!!html-loader!@public/icons/' + props.name + '.svg').default
    "
  ></div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
<style lang="scss" scoped src="./svg-icon.style.scss"></style>
