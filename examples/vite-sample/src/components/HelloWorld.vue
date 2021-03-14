<template>
  <button @click="tr">top-right</button>
  <button @click="tl">top-left</button>
  <button @click="br">bottom-right</button>
  <button @click="bl">bottom-left</button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { MoshaToastFn } from 'mosha-vue-toastify'
export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const moshaToast = inject<MoshaToastFn>('moshaToast')
    const tr = () => {
      if(moshaToast) {
        moshaToast({
          title: 'title',
          description: 'desc',
          transition: 'flip',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        })
      }
    }

    const tl = () => {
      if(moshaToast) {
        moshaToast({
          title: 'title',
          description: 'desc',
          transition: 'slide',
          position: 'top-left',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        })
      }
    }

    const br = () => {
      if(moshaToast) {
        moshaToast({
          title: 'title',
          description: 'desc',
          transition: 'bounce',
          position: 'bottom-right',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        })
      }
    }

    const bl = () => {
      if(moshaToast) {
        moshaToast({
          title: 'title',
          description: 'desc',
          position: 'bottom-left',
          transition: 'slide',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        })
      }
    }
    return { tr, tl, br, bl }
  }
})
</script>
