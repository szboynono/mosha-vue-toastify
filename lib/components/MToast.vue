<template>
  <transition :name="transitionType" type="animation">
    <div
      class="mosha__toast"
      :style="style"
      :class="toastBackgroundColor ? null : type"
      v-if="visible"
      @mouseenter="stopTimer"
      @mousedown="onMouseDown"
      @mouseleave="onMouseLeave"
    > 
      <div class="mosha__toast__content-wrapper">
        <MIcon v-if="showIcon" :type="type"/>
        <div class="mosha__toast__content">
          <div class="mosha__toast__content__text">{{ text }}</div>
          <div class="mosha__toast__content__description" v-if="description"> {{ description }} </div>
        </div>
      </div>
      <div
        v-if="closable"
        class="mosha__toast__close-icon"
        @click="onCloseHandler"
      ></div>
      <div v-if="!hideProgressBar" class="mosha__toast__progress" :style="{width: `${progress}%`}"></div>
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
import MIcon from './MIcon.vue'

export default defineComponent({
  name: "MToast",
  components: {
    MIcon
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
      default: false
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
    const swipeStart = ref(undefined);

    const closeCallback = () => {
      props.onCloseHandler();
    };

    const { start, stop, progress } = useTimer(closeCallback, props.timeout);

    const startTimer = () => {
      if (props.timeout > 0) {
        start()
      }
    }

    const stopTimer = () => {
      if (props.timeout > 0) {
        stop()
      }
    }

    const onMouseLeave = () => {
      swipeStart.value = undefined;
      removeEventListener('mousemove', log)
      startTimer()
    }

    const log = (event: any) => {
      const diff = Math.abs((swipeStart.value as any).clientX - event.clientX)

      if ( diff > 200 ) {
        closeCallback()
      }
    }
    
    const onMouseDown = (event: any) => {
      swipeStart.value = event
      addEventListener('mousemove', log)
      addEventListener('mouseup', () => { 
        swipeStart.value = undefined;
        removeEventListener('mousemove', log) 
      })
    }

    const { transitionType } = useTransitionType(
      props.position,
      props.transition
    );

    watchEffect(() => {
      const { customStyle } = useCustomStyle(props.position, props.offset, props.toastBackgroundColor);
      style.value = customStyle.value;
    });

    onMounted(() => {
      startTimer();
    });

    onUnmounted(() => {
      removeEventListener('mousemove', log)
    })

    return {
      style,
      transitionType,
      startTimer,
      stopTimer,
      progress,
      onMouseDown,
      onMouseLeave
    };
  },
});
</script>