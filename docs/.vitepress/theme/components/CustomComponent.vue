<template>
  <div class="d-flex">
    <h2>Custom Component Title</h2>
    <p>May be a <a href="#">link</a> in here?</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";

export default defineComponent({
  name: "CustomComponent",
});
</script>

<style>
</style>