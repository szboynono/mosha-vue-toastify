<template>
  <div style="margin-top: 500px;">
    <button @click="tr">top-right</button>
    <button @click="tl">top-left</button>
    <button @click="br">bottom-right</button>
    <button @click="bl">bottom-left</button>
    <button @click="tc">top-center</button>
    <button @click="bc">bottom-center</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { createToast } from 'mosha-vue-toastify';
export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const tr = () => {
        createToast({
          title: 'title',
          description: 'desc',
          transition: 'flip',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        })
    }

    const tl = () => {
        createToast({
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

    const br = () => {
        createToast({
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

    const bl = () => {
        createToast({
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

    const tc = () => {
        createToast({
          title: 'title',
          description: 'desc',
          position: 'top-center',
          transition: 'slide',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        })
    }

    const bc = () => {
        createToast({
          title: 'title',
          description: 'desc',
          position: 'bottom-center',
          transition: 'flip',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        })
    }
    return { tr, tl, br, bl, tc, bc }
  }
})
</script>
