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
import { defineComponent } from 'vue'
import { createToast } from '../../../../lib/main';

export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const tr = () => {
        createToast('content here')
    }

    const tl = () => {
        createToast('content', {
          transition: 'slide',
          position: 'top-left',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        })
    }

    const br = () => {
        createToast('yoasihco', {
          transition: 'bounce',
          position: 'bottom-right',
          timeout: 1000,
          onClose: () => {
            console.log('log')
          }
        })
    }

    const bl = () => {
        createToast('asdsadf', {
          position: 'bottom-left',
          transition: 'slide',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        })
    }

    const tc = () => {
        createToast('afsasgg', {
          position: 'top-center',
          transition: 'slide',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        })
    }

    const bc = () => {
        createToast('asdfff', {
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
