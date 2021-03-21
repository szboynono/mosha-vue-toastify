<template>
  <div class="example">
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
import 'mosha-vue-toastify/dist/style.css'
import { createToast } from '../../../../lib/main';

export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const tr = () => {
        createToast('content here')
    }

    const tl = () => {
        createToast({
          title: 'this is a title',
          description: 'this is a description'
        }, {
          transition: 'slide',
          position: 'top-left',
          type: 'info',
          showIcon: true,
          hideProgressBar: false,
          timeout: 10000,
          onClose: () => {
            console.log('log')
          }
        })
    }

    const br = () => {
        createToast('yoasihco', {
          transition: 'bounce',
          position: 'bottom-right',
          type: 'warning',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        })
    }

    const bl = () => {
        createToast('asdsadf', {
          position: 'bottom-left',
          transition: 'slide',
          timeout: 15000,
          type: 'danger',
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
          type: 'success',
          onClose: () => {
            console.log('log')
          }
        })
    }

    const bc = () => {
        createToast('asdfff', {
          position: 'bottom-center',
          transition: 'flip',
          timeout: 3000,
          onClose: () => {
            console.log('log')
          }
        })
    }
    return { tr, tl, br, bl, tc, bc }
  }
})
</script>
