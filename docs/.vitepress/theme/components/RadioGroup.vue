<template>
  <div class="mt-3">
    <div class="mb-2 font-semibold">{{ type === 'toastType' ? 'type' : type }}</div>
    <div v-for="item of items" :key="item" class="inline-block mr-3">
      <input class="mr-2" type="radio" :id="item" :name="type" :value="item" @change="onChange">
      <label :for="item">{{ item }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    items: Array,
    type: String
  },
  setup(props, { emit }) {
    const onChange = (event: any) => {
      emit(`update:${props.type}`, event.target.value)
    }
    return { onChange }
  },
})
</script>
