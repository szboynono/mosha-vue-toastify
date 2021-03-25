<template>
  <div>
    <div class="code">
      <template v-if="options">
        <div><span class="func-name">createToast</span>(<span class="text">'some text'</span>,  {</div>
        <div class="indent"><span class="property">timeout</span>: 2000,</div>
        <div>})</div>
      </template>
      <template v-else>
        <div><span class="func-name">createToast</span>(<span v-html="textArg"></span>)</div>
      </template>
    </div>
    <div>
      <div class="input-group">
        <label for="title">Text:</label>
        <input id="title" type="text">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'

interface ToastOptions {
  type?: string,
  timeout?: number,
  showCloseButton?: boolean,
  position?: string,
  showIcon?: boolean,
  transition?: string,
  hideProgressBar?: boolean,
  toastBackgroundColor?: string,
  swipeClose?: boolean,
  onClose?: () => void
}

export default defineComponent({
  name: 'Code',
  setup() {
    const text = ref<any>('');
    const options = ref<ToastOptions>();

    const textArg = computed(() => {
      return `<span class="text">'${text.value}'</span>`
    })
    return { textArg, options }
  },
})
</script>

<style scoped>
.code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  padding: 1.25rem 1.5rem;
  width: max-content;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur( 30px );
  border: solid 2px transparent;
  background: rgba(255,255,255, 0.5) !important;
  background-clip: padding-box;
  box-shadow: 10px 10px 10px  rgba(46, 54, 68, 0.03);
  border-radius: 8px;
  color: #2D2A2E;
}
.indent {
  margin-left: 16px;
}

.func-name {
  color: #F92672;
}

.text {
  color: #646cff;
}

.property {
  color: #A6E22E;
}



</style>
