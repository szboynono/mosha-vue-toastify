<template>
  <button @click="hit">hit</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const moshaToast = inject<any>('moshaToast')
    const hit = () => {
      moshaToast()
    }
    return { hit }
  }
})
</script>
