<template>
  <div class="mt-3">
    <label for="title" class="block mb-1 font-semibold"> {{ type }} </label>
    <input 
      :id="type" 
      :type="type === 'timeout' ? 'number' : 'text'" 
      @input="onInput" 
      :value="getValue" 
      class="p-1 w-48 text-xs rounded-md focus:outline-none focus:ring-2 focus:border-transparent">
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'InputGroup',
  props: {
    type: String,
    text: String,
    description: String,
    toastBackgroundColor: String,
    timeout: {
      type: Number,
    }
  },
  setup(props, { emit }) {
    const onInput = (event: any) => {
      if (props.type === 'timeout') {
        emit(`update:${props.type}`, +event.target.value)
      } else {
        emit(`update:${props.type}`, event.target.value)
      }
    }
    const getValue = computed(() => {
      if (!props.type) return ;
      return (props as any)[props.type]
    })
    return { onInput, getValue }
  }
})
</script>

<style scoped>
input {
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur( 30px );
  border: solid 2px transparent;
  background: rgba(255,255,255, 0.5) !important;
  background-clip: padding-box;
  box-shadow: 10px 10px 10px  rgba(46, 54, 68, 0.03);
}
</style>
