<template>
  <div>
    <div class="code">
      <template v-if="options">
        <div>
          <span class="text-pink-500">createToast</span>(<span
            v-html="textArg"
          ></span
          >,
          <div>{</div>
          <div v-html="optionsArg"></div>
          <div>})</div>
        </div>
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
      <InputGroup
        v-if="text.length > 0"
        type="description"
        v-model:description="description"
      />
      <RadioGroup
        v-if="text.length > 0"
        :items="[
          'top-left',
          'top-right',
          'top-center',
          'bottom-left',
          'bottom-right',
          'bottom-center',
        ]"
        v-model:position="position"
      />
      <InputGroup type="timeout" v-model:timeout="timeout" />
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
import { computed, defineComponent, ref, watchEffect } from "vue";
import { createToast } from "../../../../lib/main";
import "../../../../lib/index.scss";
import InputGroup from "./InputGroup.vue";
import RadioGroup from "./RadioGroup.vue";
import { ToastOptions } from "../../../../lib/types";

export default defineComponent({
  name: "Code",
  components: {
    InputGroup,
    RadioGroup,
  },
  setup() {
    const text = ref("Some text");
    const description = ref("");
    const position = ref("");
    const timeout = ref<number | undefined>();
    const options = ref<ToastOptions>();

    watchEffect(() => {
      if (position.value.length > 0) {
        options.value = {
          ...options.value,
          position: position.value as any,
        };
      }

      if (timeout.value) {
        options.value = {
          ...options.value,
          timeout: timeout.value as any,
        };
      }
    });

    const showToast = () => {
      let arg1: any = text.value;
      if (description.value.length > 0) {
        arg1 = {
          title: text.value,
          description: description.value,
        };
      }
      createToast(arg1, options.value);
    };

    const textArg = computed(() => {
      if (description.value.length > 0) {
        return `{ 
                  <div class="ml-5">title: <span class="text-indigo-500">'${text.value}'</span>,</div> 
                  <div class="ml-5">description: <span class="text-indigo-500">'${description.value}'</span></div>}`;
      }
      return `<span class="text-indigo-500">'${text.value}'</span>`;
    });

    const optionsArg = computed(() => {
      // return `<span class="ml-5">position: <span class="text-indigo-500">'${position.value}'</span></span>`
      let output = '<div class="ml-5">';

      if (!options.value) return;

      Object.keys(options.value).forEach((key) => {
          output += `<div>${key}: <span class="text-indigo-500">${(options.value as any)[key]}</span></div>`;
      });
      output += "</div>";
      return output;
    });
    return {
      text,
      description,
      options,
      textArg,
      showToast,
      position,
      optionsArg,
      timeout,
    };
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
