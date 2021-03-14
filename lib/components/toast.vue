<template>
  <transition :name="transitionType" type="animation">
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
import { Position, TransitionType } from './createToast'

type TransitionMap = {[pos in Position]: {[type in TransitionType]: string}}

const TRANSITION_MAP: TransitionMap = {
  'top-left': {
    'bounce': 'mosha__bounceInLeft',
    'flip': 'mosha__flipIn',
    'slide': 'mosha__slideInLeft',
  },
  'top-right': {
    'bounce': 'mosha__bounceInRight',
    'flip': 'mosha__flipIn',
    'slide': 'mosha__slideInRight',
  },
  'top-center': {
    'bounce': 'mosha__bounceInDown',
    'flip': 'mosha__flipIn',
    'slide': 'mosha__slideInDown',
  },
  'bottom-center': {
    'bounce': 'mosha__bounceInUp',
    'flip': 'mosha__flipIn',
    'slide': 'mosha__slideInUp',
  },
  'bottom-right': {
    'bounce': 'mosha__bounceInRight',
    'flip': 'mosha__flipIn',
    'slide': 'mosha__slideInRight',
  },
  'bottom-left': {
    'bounce': 'mosha__bounceInLeft',
    'flip': 'mosha__flipIn',
    'slide': 'mosha__slideInLeft',
  },
}

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
    transition: {
      type: String as PropType<TransitionType>,
      default: 'bounce'
    }
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

    const transitionType = computed(() => TRANSITION_MAP[props.position][props.transition])
    
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
        case 'top-center':
          return {
            top: `${props.offset}px`,
            left: '0',
            right: '0',
            marginRight: 'auto',
            marginLeft: 'auto'
          }
        case 'bottom-center':
          return {
            bottom: `${props.offset}px`,
            left: '0',
            right: '0',
            marginRight: 'auto',
            marginLeft: 'auto'
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