<template>
  <div class="mt-3">
    <input class="mr-2" type="checkbox" :id="type" :name="type" @change="onChange" :checked="getChecked">
    <label :for="type">{{ type }}</label>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent ({
  props: {
    type: {
      type: String,
      required: true
    },
    hideProgessBar: {
      type: Boolean,
      default: false
    },
    useComponentContent: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    swipeClose: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const onChange = (event: any) => {
      emit(`update:${props.type}`, event.target.checked)
    }
    const getChecked = computed(() => {
      if (!props.type) return
      return (props as any)[props.type]
    })

    return { onChange, getChecked }
  }
})
</script>