<template>
  <div>
    <div class="code mx-auto">
      <template v-if="useComponentContent">
        // pass a component into the toast
      </template>
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
      <div class="flex justify-center items-center flex-wrap">
        <div class="mx-10">
          <template v-if="!useComponentContent">
            <InputGroup type="text" v-model:text="text" />
            <InputGroup
              v-if="text.length > 0"
              type="description"
              v-model:description="description"
            />
          </template>
          <InputGroup type="timeout" v-model:timeout="timeout" />
          <InputGroup
            type="toastBackgroundColor"
            v-model:toastBackgroundColor="toastBackgroundColor"
          />
        </div>
        <div v-if="text.length > 0" class="mx-10">
          <CheckBox
            type="useComponentContent"
            :useComponentContent="useComponentContent"
            v-model:useComponentContent="useComponentContent"
          />
          <CheckBox
            type="hideProgessBar"
            :hideProgessBar="hideProgessBar"
            v-model:hideProgessBar="hideProgessBar"
          />
          <CheckBox
            type="showIcon"
            :showIcon="showIcon"
            v-model:showIcon="showIcon"
          />
          <CheckBox
            type="showCloseButton"
            :showCloseButton="showCloseButton"
            v-model:showCloseButton="showCloseButton"
          />
          <CheckBox
            type="swipeClose"
            :swipeClose="swipeClose"
            v-model:swipeClose="swipeClose"
          />
        </div>
      </div>

      <div>
        <RadioGroup
          v-if="text.length > 0"
          type="position"
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
        <RadioGroup
          v-if="text.length > 0"
          type="toastType"
          :items="['default', 'info', 'warning', 'success', 'danger']"
          v-model:toastType="toastType"
        />
        <RadioGroup
          v-if="text.length > 0"
          type="transition"
          :items="['bounce', 'zoom', 'slide']"
          v-model:transition="transition"
        />
      </div>
      
      <button
        @click="showToast"
        class="w-full antialiased text-lg h-12 mt-5 bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
      >
        Show toast!
      </button>
      <button
        @click="clearAll"
        class="w-full antialiased text-lg h-12 mt-5 bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
      >
        Clear All
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import { clearToasts, createToast } from "../../../../lib/main";
import "../../../../lib/index.scss";
import InputGroup from "./InputGroup.vue";
import RadioGroup from "./RadioGroup.vue";
import CustomComponent from "./CustomComponent.vue";
import CheckBox from "./CheckBox.vue";
import { ToastOptions } from "../../../../lib/types";

export default defineComponent({
  name: "Code",
  components: {
    InputGroup,
    RadioGroup,
    CheckBox,
    CustomComponent,
  },
  setup() {
    const text = ref("Some text");
    const description = ref("");
    const position = ref("");
    const toastType = ref("");
    const transition = ref("");
    const hideProgessBar = ref();
    const useComponentContent = ref();
    const showIcon = ref();
    const swipeClose = ref();
    const showCloseButton = ref();
    const timeout = ref<number | undefined>();
    const toastBackgroundColor = ref<string | undefined>();
    const options = ref<ToastOptions>();

    watchEffect(() => {
      if (position.value.length > 0) {
        options.value = {
          ...options.value,
          position: position.value as any,
        };
      }

      if (transition.value.length > 0) {
        options.value = {
          ...options.value,
          transition: transition.value as any,
        };
      }

      if (toastType.value.length > 0) {
        options.value = {
          ...options.value,
          type: toastType.value as any,
        };
      }

      if (timeout.value) {
        options.value = {
          ...options.value,
          timeout: timeout.value as any,
        };
      }

      if (toastBackgroundColor.value) {
        options.value = {
          ...options.value,
          toastBackgroundColor: toastBackgroundColor.value as any,
        };
      }

      if (hideProgessBar.value !== undefined) {
        options.value = {
          ...options.value,
          hideProgressBar: hideProgessBar.value,
        };
      }

      if (showIcon.value !== undefined) {
        options.value = {
          ...options.value,
          showIcon: showIcon.value,
        };
      }

      if (showCloseButton.value !== undefined) {
        options.value = {
          ...options.value,
          showCloseButton: showCloseButton.value,
        };
      }

      if (swipeClose.value !== undefined) {
        options.value = {
          ...options.value,
          swipeClose: swipeClose.value,
        };
      }
    });

    const showToast = () => {
      if (useComponentContent.value) {
        createToast(CustomComponent, options.value);
        return;
      }

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
      if (useComponentContent.value) {
        return `<span class="text-indigo-500">CustomComponent</span>`
      }
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
        const value = (options.value as any)[key];

        output += `<div>${key}: <span class="text-indigo-500">${
          key === "timeout" ? "" : "'"
        }${value}${key === "timeout" ? "" : "'"}</span>,</div>`;
      });
      output += "</div>";
      return output;
    });

    const clearAll = () => {
      clearToasts()
    }

    return {
      text,
      description,
      options,
      textArg,
      showToast,
      position,
      optionsArg,
      timeout,
      toastType,
      transition,
      hideProgessBar,
      useComponentContent,
      showCloseButton,
      showIcon,
      swipeClose,
      toastBackgroundColor,
      clearAll
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
