<template>
  <transition :name="transitionType" type="animation">
    <div
      class="mosha__toast"
      :style="style"
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
    const swipeStart = ref<MouseEvent | TouchEvent>();
    const swipedDiff = ref<number | undefined>(undefined);

    const closeCallback = () => {
      props.onCloseHandler();
    };

    const { start, stop, progress } = useTimer(closeCallback, props.timeout);

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
      swipeStart.value = undefined;
      removeEventListener("mousemove", swipeHandler);
      startTimer();
    };

    const isMouseEvent = (event: MouseEvent | TouchEvent): boolean =>
      event instanceof MouseEvent;

    const swipeHandler = (event: MouseEvent | TouchEvent) => {
      if (!swipeStart.value) return;
      if (isMouseEvent(event)) {
        swipedDiff.value =
          (swipeStart.value as MouseEvent).clientX -
          (event as MouseEvent).clientX;
      } else {
        swipedDiff.value =
          (swipeStart.value as TouchEvent).touches[0].clientX -
          (event as TouchEvent).touches[0].clientX;
      }

      if (props.position.endsWith("left")) {
        (style.value as CSSProperties).transition = "none";
        (style.value as CSSProperties).left = `${-swipedDiff.value}px`;
      } else {
        (style.value as CSSProperties).transition = "none";
        (style.value as CSSProperties).right = `${swipedDiff.value}px`;
      }

      if (Math.abs(swipedDiff.value) > 220) {
        closeCallback();
      }
    };

    const startSwiptHandler = (event: MouseEvent | TouchEvent) => {
      swipeStart.value = event;
      const move = isMouseEvent(event) ? "mousemove" : "touchmove";
      const moveEnd = isMouseEvent(event) ? "mouseup" : "touchend";

      addEventListener(move, swipeHandler);
      addEventListener(moveEnd, () => {
        swipeStart.value = undefined;
        if (props.position.endsWith("left")) {
          (style.value as CSSProperties).transition = "left .3s ease-out";
          (style.value as CSSProperties).left = 0;
        } else {
          (style.value as CSSProperties).transition = "right .3s ease-out";
          (style.value as CSSProperties).right = 0;
        }
        removeEventListener(move, swipeHandler);
      });
    };

    const onMouseDown = (event: MouseEvent) => {
      startSwiptHandler(event);
    };

    const onTouchStart = (event: TouchEvent) => {
      startSwiptHandler(event);
    };

    const { transitionType } = useTransitionType(
      props.position,
      props.transition,
      swipedDiff
    );

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

    onUnmounted(() => {
      removeEventListener("mousemove", swipeHandler);
      removeEventListener("touchmove", swipeHandler);
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
    };
  },
});
</script>