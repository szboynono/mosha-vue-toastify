<template>
<h1>TEST!!!</h1>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";

export default defineComponent({
  name: "Test",
  setup() {
    onUnmounted(() => {
      console.log('closed!')
    })
  }
});
</script>

<style>
</style>