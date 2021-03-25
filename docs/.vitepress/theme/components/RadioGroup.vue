<template>
  <div class="mt-3">
    <div v-for="item of items" :key="item" class="inline-block mr-3">
      <input class="mr-2" type="radio" :id="item" name="same" :value="item" v-model="picked">
      <label :for="item">{{ item }}</label>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  props: {
    items: Array,
    selected: String
  },
  setup(props, { emit }) {
    const picked = ref('')
    watchEffect(() => {
      if (picked.value.length > 0) {
        emit(`update:position`, picked.value)
      }
    })
    return { picked }
  },
})
</script>
