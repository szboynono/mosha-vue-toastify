<template>
  <div class="example">
    <button @click="all">all</button>
    <button @click="tr">top-right</button>
    <button @click="tl">top-left</button>
    <button @click="br">bottom-right</button>
    <button @click="bl">bottom-left</button>
    <button @click="tc">top-center</button>
    <button @click="bc">bottom-center</button>
    <button @click="clear">clear toasts</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import '../../../../lib/index.scss'
import { clearToasts, createToast, withProps } from '../../../../lib/main'
import Test from './Test.vue'

export default defineComponent({
  name: 'HelloWorld',
  components: {
    Test
  },
  setup() {
    const all = () => {
      createToast('This is default!', {
        position: 'top-center',
        timeout: 12000
      })
      setTimeout(() => {
        createToast('This is success!', {
          type: 'success',
          position: 'top-center',
          showIcon: true,
          timeout: 15000
        })
        setTimeout(() => {
          createToast('This is warning!', {
            type: 'warning',
            position: 'top-center',
            showIcon: true,
            timeout: 10000
          })
          setTimeout(() => {
            createToast(
              { title: 'This is danger!', description: 'some description' },
              {
                type: 'danger',
                showIcon: true,
                position: 'top-center',
                timeout: 8000
              }
            )
            setTimeout(() => {
              createToast(
                { title: 'Background color', description: 'choose a bg color' },
                {
                  type: 'danger',
                  showIcon: true,
                  position: 'top-center',
                  timeout: 8000,
                  toastBackgroundColor: 'black'
                }
              )
            }, 1),
              setTimeout(() => {
                createToast(withProps(Test, { title: 'Custom Component!' }), {
                  position: 'top-center',
                  timeout: 8000
                })
              }, 1)
          }, 1)
        }, 1)
      }, 1)
    }
    const tr = () => {
      const { close } = createToast('content here', {
        onClose: () => {
          console.log('log')
        }
      })
      setTimeout(() => {
        close()
      }, 500)
    }

    const tl = () => {
      createToast(withProps(Test, { title: 'title' }), {
        transition: 'slide',
        position: 'top-left',
        type: 'info',
        showIcon: true,
        swipeClose: true,
        hideProgressBar: false,
        timeout: -1,
        onClose: () => {
          console.log('log')
        }
      })
    }

    const br = () => {
      createToast(
        { title: 'yoyo', description: 'some thing good <br/> good thing' },
        {
          transition: 'bounce',
          position: 'bottom-right',
          type: 'warning',
          timeout: -1,
          onClose: () => {
            console.log('log')
          }
        }
      )
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
      createToast('Please see this notice right here!', {
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
        transition: 'zoom',
        timeout: 3000,
        onClose: () => {
          console.log('log')
        }
      })
    }

    const clear = () => {
      clearToasts()
    }
    return { tr, tl, br, bl, tc, bc, all, clear }
  }
})
</script>
