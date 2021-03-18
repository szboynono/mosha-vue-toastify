<template>
  <transition :name="transitionType" type="animation">
    <div
      class="mosha__toast"
      :style="style"
      :class="[type]"
      v-if="visible"
      @mouseenter="stopTimer"
      @mouseleave="startTimer"
    > 
      <div class="mosha__toast__content-wrapper">
        <MIcon :type="type"/>
        <div class="mosha__toast__content">
          <div class="mosha__toast__content__text">{{ text }}</div>
          <div class="mosha__toast__content__description">aosidsaoidh sao idhoais aosidh oh oi</div>
        </div>
      </div>
      <div
        v-if="closable"
        class="mosha__toast__close-icon"
        @click="onCloseHandler"
      ></div>
      <div class="mosha__toast__progress" :style="{width: `${progress}%`}"></div>
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
    type: {
      type: String as PropType<ToastType>,
      default: "default",
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

    const timout = props.timeout > 0 ? props.timeout : 1200000
    
    const closeCallback = () => {
      props.onCloseHandler();
    };

    const { start, stop, progress } = useTimer(closeCallback, timout);

    const startTimer = () => {
      start()
    }

    const stopTimer = () => {
      stop()
    }

    const { transitionType } = useTransitionType(
      props.position,
      props.transition
    );

    watchEffect(() => {
      const { customStyle } = useCustomStyle(props.position, props.offset);
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
      progress
    };
  },
});
</script>