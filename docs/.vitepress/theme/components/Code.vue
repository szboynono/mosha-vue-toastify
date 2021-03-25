<template>
  <div>
    <div class="code">
      <template v-if="options">
        <div>
          <span class="text-pink-500">createToast</span>(<span class="text"
            >'some text'</span
          >, {
        </div>
        <div class="indent"><span class="property">timeout</span>: 2000,</div>
        <div>})</div>
      </template>
      <template v-else>
        <div>
          <span class="text-pink-500">createToast</span>(<span
            v-html="textArg"
          ></span
          >)
        </div>
      </template>
    </div>
    <div>
      <InputGroup type="text" v-model:text="text" />
      <InputGroup v-if="text.length > 0" type="description" v-model:description="description" />
      <button
        @click="showToast"
        class="mt-3 bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
      >
        Show toast!
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { createToast } from '../../../../lib/main';
import '../../../../lib/index.scss'
import InputGroup from "./InputGroup.vue";

interface ToastOptions {
  type?: string;
  timeout?: number;
  showCloseButton?: boolean;
  position?: string;
  showIcon?: boolean;
  transition?: string;
  hideProgressBar?: boolean;
  toastBackgroundColor?: string;
  swipeClose?: boolean;
  onClose?: () => void;
}

export default defineComponent({
  name: "Code",
  components: {
    InputGroup,
  },
  setup() {
    const text = ref("Some text");
    const description = ref("");
    const options = ref<ToastOptions>();

    const showToast = () => {
      let arg1: any = text.value;
      if (description.value.length > 0) {
        arg1 = {
          title: text.value,
          description: description.value
        }
      }
      createToast(arg1, {
        timeout: -1
      })
    }

    const textArg = computed(() => {
      if (description.value.length > 0) {
        return `{ 
                  title: <span class="text-indigo-500">'${text.value}'</span>, 
                  description: <span class="text-indigo-500">'${description.value}'</span>}`;
      }
      return `<span class="text-indigo-500">'${text.value}'</span>`;
    });
    return { text, description, options, textArg, showToast };
  },
});
</script>

<style scoped>
.code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  padding: 1.25rem 1.5rem;
  width: max-content;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: solid 2px transparent;
  background: rgba(255, 255, 255, 0.5) !important;
  background-clip: padding-box;
  box-shadow: 10px 10px 10px rgba(46, 54, 68, 0.03);
  border-radius: 8px;
  color: #2d2a2e;
}
</style>
