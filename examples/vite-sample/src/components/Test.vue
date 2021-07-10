<template>
<h2>{{ title }}</h2>
<a href="#">some link</a>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";

export default defineComponent({
  name: "Test",
  props: {
    title: String
  },
  setup() {
    onUnmounted(() => {
      console.log('closed!')
    })
  }
});
</script>

<style>
</style>