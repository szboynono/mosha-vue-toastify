<template>
  <transition :name="transitionType">
    <div
      class="mosha__toast"
      :style="customStyle"
      :class="[type]"
      v-if="visible"
      @mouseenter="stopTimer"
      @mouseleave="startTimer"
    >
      <div class="mosha__toast__content">
        <template v-if="type === 'success' && (showIcon || type)">
          <span class="material-icons-round"> check_circle </span>
        </template>
        <template v-else-if="type === 'warning' && (showIcon || type)">
          <span class="material-icons-round"> info </span>
        </template>
        <template v-else-if="type === 'info' && (showIcon || type)">
          <span class="material-icons-round"> info </span>
        </template>
        <template v-else-if="type === 'danger' && (showIcon || type)">
          <span class="material-icons-round"> highlight_off </span>
        </template>
        <template v-else-if="type === 'default' && showIcon">
          <span class="material-icons-round"> info </span>
        </template>
        <div>
          <div class="mosha__toast__content__title">{{ title }}</div>
          <div class="mosha__toast__content__description">
            {{ description }}
          </div>
        </div>
      </div>
      <div
        v-if="closable"
        class="mosha__toast__close-icon"
        @click="onCloseHandler"
      ></div>
    </div>
  </transition>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, onMounted, ref, onUnmounted } from 'vue'
import { Position } from './useToast'

export default defineComponent({
  name: 'toast',
  data() {
    return {
      show: false,
    }
  },
  props: {
    visible: Boolean,
    title: String,
    description: String,
    type: {
      type: String,
      default: 'default',
    },
    onCloseHandler: {
      type: Function as PropType<() => void>,
      required: true,
    },
    // For client
    onClose: {
      type: Function as PropType<() => void>,
    },
    offset: Number,
    id: {
      type: Number,
      required: true,
    },
    timeout: {
      type: Number,
      default: 5000
    },
    position: {
      type: String as PropType<Position>,
      required: true,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const timer = ref<any | null>(null)

    onMounted(() => {
      startTimer()
    })

    onUnmounted(() => {
      stopTimer()
      if(!props.onClose) return
      props.onClose()
    })

    const startTimer = () => {
      if (props.timeout <= 0) return
      timer.value = setTimeout(() => {
        props.onCloseHandler()
      }, props.timeout)
    }

    const stopTimer = () => {
      if (props.timeout <= 0 || !timer.value) return
      clearTimeout(timer.value)
    }

    const transitionType = computed(() => {
      if (props.position.endsWith('left')) {
        return 'mosha__slide-right'
      } else {
        return 'mosha__slide-left'
      }
    })
    const customStyle = computed(() => {
      switch (props.position) {
        case 'top-left':
          return {
            left: '16px',
            top: `${props.offset}px`,
          }
        case 'bottom-left':
          return {
            left: '16px',
            bottom: `${props.offset}px`,
          }
        case 'bottom-right':
          return {
            right: '16px',
            bottom: `${props.offset}px`,
          }
        default:
          return {
            right: '16px',
            top: `${props.offset}px`,
          }
      }
    })

    return { customStyle, transitionType, startTimer, stopTimer }
  }
})
</script>