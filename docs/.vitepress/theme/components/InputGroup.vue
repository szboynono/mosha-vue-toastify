<template>
  <div class="mt-3">
    <label for="title" class="mr-2">{{ type }}:</label>
    <input 
      :id="type" 
      type="text" 
      @input="onInput" 
      :value="getValue" 
      class="p-1 text-xs rounded-md focus:outline-none focus:ring-2 focus:border-transparent">
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'InputGroup',
  props: {
    type: String,
    text: String,
    description: String
  },
  setup(props, { emit }) {
    const onInput = (event: any) => {
      emit(`update:${props.type}`, event.target.value)
    }
    const getValue = computed(() => {
      return props.type === 'text' ? props.text : props.description
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
