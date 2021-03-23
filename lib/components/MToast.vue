<template>
  <transition :name="transitionType" type="animation">
    <div
      class="mosha__toast"
      :style="[style, swipeStyle]"
      :class="toastBackgroundColor ? null : type"
      v-if="visible"
      @mouseenter="stopTimer"
      @mouseleave="onMouseLeave"
      @touchstart="onTouchStart"
      @mousedown="onMouseDown"
    >
      <div class="mosha__toast__content-wrapper">
        <MIcon v-if="showIcon" :type="type" />
        <div class="mosha__toast__content">
          <div class="mosha__toast__content__text">{{ text }}</div>
          <div class="mosha__toast__content__description" v-if="description">
            {{ description }}
          </div>
        </div>
      </div>
      <div
        v-if="closable"
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
  onUnmounted,
} from "vue";
import { Position, ToastType, TransitionType } from "../types";
import useTimer from "../hooks/useTimer";
import useTransitionType from "../hooks/useTransitionType";
import useCustomStyle from "../hooks/useCustomStyle";
import useSwipe from "../hooks/useSwipe";
import MIcon from "./MIcon.vue";

export default defineComponent({
  name: "MToast",
  components: {
    MIcon,
  },
  props: {
    visible: Boolean,
    text: String,
    description: String,
    toastBackgroundColor: String,
    type: {
      type: String as PropType<ToastType>,
      default: "default",
    },
    onCloseHandler: {
      type: Function as PropType<() => void>,
      required: true,
    },
    offset: Number,
    id: {
      type: Number,
      required: true,
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    position: {
      type: String as PropType<Position>,
      required: true,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    hideProgressBar: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String as PropType<TransitionType>,
      default: "bounce",
    },
  },
  setup(props) {
    const style = ref<CSSProperties>();

    const {
      swipeStart,
      swipedDiff,
      swipeHandler,
      startSwipeHandler,
      swipeStyle,
      cleanUpMove
    } = useSwipe(props.position, props.onCloseHandler);

    const { transitionType } = useTransitionType(
      props.position,
      props.transition,
      swipedDiff
    );

    const { start, stop, progress } = useTimer(() => {
      props.onCloseHandler();
    }, props.timeout);

    const startTimer = () => {
      if (props.timeout > 0) {
        start();
      }
    };

    const stopTimer = () => {
      if (props.timeout > 0) {
        stop();
      }
    };

    const onMouseLeave = () => {
      cleanUpMove('mousemove');
      startTimer();
    };

    const onMouseDown = (event: MouseEvent) => {
      startSwipeHandler(event);
    };

    const onTouchStart = (event: TouchEvent) => {
      startSwipeHandler(event);
    };

    watchEffect(() => {
      const { customStyle } = useCustomStyle(
        props.position,
        props.offset,
        props.toastBackgroundColor
      );
      style.value = customStyle.value;
    });

    onMounted(() => {
      startTimer();
    });

    return {
      style,
      transitionType,
      startTimer,
      stopTimer,
      progress,
      onTouchStart,
      onMouseLeave,
      onMouseDown,
      swipeStyle,
    };
  },
});
</script>