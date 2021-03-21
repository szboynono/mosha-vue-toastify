<template>
  <HelloWorld />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
});
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  margin: 0;
}
</style>