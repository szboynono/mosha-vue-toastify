<template>
  <transition :name="transitionType" type="animation">
    <div
      v-if="visible"
      class="mosha__toast"
      :style="[style, swipeStyle]"
      :class="toastBackgroundColor ? null : type"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @touchstart.passive="onTouchStart"
      @mousedown="onMouseDown"
    >
      <!-- eslint-disable vue/no-v-html -->
      <div class="mosha__toast__content-wrapper">
        <MIcon v-if="showIcon" :type="type" />
        <div class="mosha__toast__content">
          <div class="mosha__toast__content__text">{{ text }}</div>
          <div
            v-if="description.length > 0 && isDescriptionHtml"
            class="mosha__toast__content__description"
            v-html="description"
          ></div>
          <div
            v-if="description.length > 0 && !isDescriptionHtml"
            class="mosha__toast__content__description"
          >
            {{ description }}
          </div>
        </div>
      </div>
      <!--eslint-enable-->
      <div v-if="isSlotPassed" class="mosha__toast__slot-wrapper">
        <slot></slot>
      </div>
      <div
        v-if="showCloseButton"
        class="mosha__toast__close-icon"
        @click="onCloseHandler"
      ></div>
      <div
        v-if="!hideProgressBar"
        class="mosha__toast__progress"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  PropType,
  defineComponent,
  onMounted,
  ref,
  watchEffect,
  CSSProperties,
  Ref,
  computed
} from 'vue'
import { Position, ToastType, TransitionType } from '../types'
import useTimer from '../hooks/useTimer'
import useTransitionType from '../hooks/useTransitionType'
import useCustomStyle from '../hooks/useCustomStyle'
import useScreenSize from '../hooks/useScreenSize'
import useSwipe from '../hooks/useSwipe'
import MIcon from './MIcon.vue'

export default defineComponent({
  name: 'MToast',
  components: {
    MIcon
  },
  props: {
    visible: Boolean,
    text: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    toastBackgroundColor: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<ToastType>,
      default: 'default'
    },
    onClose: {
      type: Function as PropType<() => void>,
      default: () => null
    },
    onCloseHandler: {
      type: Function as PropType<() => void>,
      required: true
    },
    offset: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    timeout: {
      type: Number,
      default: 5000
    },
    position: {
      type: String as PropType<Position>,
      required: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    swipeClose: {
      type: Boolean,
      default: true
    },
    hideProgressBar: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String as PropType<TransitionType>,
      default: 'bounce'
    },
  },
  setup(props, ctx) {
    const style = ref<CSSProperties>()

    const { width } = useScreenSize()

    const { swipedDiff, startSwipeHandler, swipeStyle, cleanUpMove } = useSwipe(
      props.position,
      props.onCloseHandler,
      props.swipeClose
    )

    const { transitionType } = useTransitionType(
      props.position,
      props.transition,
      swipedDiff as Ref<number>
    )

    const { start, stop, progress } = useTimer(() => {
      props.onCloseHandler()
    }, props.timeout)

    const isSlotPassed = computed(() => ctx.slots.default)

    const isDescriptionHtml = computed(() =>
      /<\/?[a-z][\s\S]*>/i.test(props.description)
    )

    const startTimer = () => {
      if (props.timeout > 0) {
        start()
      }
    }

    const onMouseEnter = () => {
      if (props.timeout > 0 && width.value > 425) {
        stop()
      }
    }

    const onMouseLeave = () => {
      cleanUpMove('mousemove')
      startTimer()
    }

    const onMouseDown = (event: MouseEvent) => {
      startSwipeHandler(event)
    }

    const onTouchStart = (event: TouchEvent) => {
      startSwipeHandler(event)
    }

    watchEffect(() => {
      const { customStyle } = useCustomStyle(
        props.position,
        props.offset,
        props.toastBackgroundColor
      )
      style.value = customStyle.value
    })

    onMounted(() => {
      startTimer()
    })

    return {
      style,
      transitionType,
      startTimer,
      progress,
      onTouchStart,
      onMouseLeave,
      onMouseDown,
      swipeStyle,
      isSlotPassed,
      isDescriptionHtml,
      onMouseEnter,
    }
  }
})
</script>
