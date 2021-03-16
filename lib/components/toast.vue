<template>
  <transition :name="transitionType" type="animation">
    <div
      class="mosha__toast"
      :style="style"
      :class="[type]"
      v-if="visible"
      @mouseenter="stop"
      @mouseleave="start"
    >
      <div class="mosha__toast__content">
        <img :src="infoIcon" alt="" />
        <div class="mosha__toast__content__text">{{ text }}</div>
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
import {
  PropType,
  defineComponent,
  onMounted,
  ref,
  watchEffect,
  CSSProperties,
} from "vue";
import { Position, TransitionType } from "../types";
import infoIcon from "../../public/info.svg";
import useTimer from "../hooks/useTimer";
import useTransitionType from "../hooks/useTransitionType";
import useCustomStyle from "../hooks/useCustomStyle";

export default defineComponent({
  name: "toast",
  data() {
    return {
      show: false,
    };
  },
  props: {
    visible: Boolean,
    text: String,
    type: {
      type: String,
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

    const timout = props.timeout > 0 ? props.timeout : 30000
    
    const closeCallback = () => {
      props.onCloseHandler();
    };

    const { start, stop } = useTimer(closeCallback, timout);

    const { transitionType } = useTransitionType(
      props.position,
      props.transition
    );

    watchEffect(() => {
      const { customStyle } = useCustomStyle(props.position, props.offset);
      style.value = customStyle.value;
    });

    onMounted(() => {
      start();
    });

    return {
      style,
      transitionType,
      start,
      stop,
      infoIcon,
    };
  },
});
</script>