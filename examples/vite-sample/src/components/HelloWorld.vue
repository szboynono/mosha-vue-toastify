<template>
  <button @click="hit">hit</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { MoshaToastFn } from 'mosha-vue-toastify'
export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const moshaToast = inject<MoshaToastFn>('moshaToast')
    const hit = () => {
      if(moshaToast) {
        moshaToast({
          title: 'title',
          description: 'desc',
          timeout: -1
        })
      }
    }
    return { hit }
  }
})
</script>
