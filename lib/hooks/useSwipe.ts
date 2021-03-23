import { CSSProperties, onUnmounted, ref } from 'vue'
import { Position } from '../types';

const useSwipe = (position: Position, onCloseHandler: () => void, swipeClose: boolean) => {
  const swipeStart = ref<MouseEvent | TouchEvent>();
  const swipedDiff = ref<number | undefined>(undefined);
  const swipeStyle = ref<CSSProperties>();

  const isMouseEvent = (event: MouseEvent | TouchEvent): boolean =>
    event instanceof MouseEvent;

  const swipeHandler = (event: MouseEvent | TouchEvent) => {
    if (swipeClose === false || !swipeStart.value) return;

    if (isMouseEvent(event)) {
      swipedDiff.value =
        (swipeStart.value as MouseEvent).clientX -
        (event as MouseEvent).clientX;
    } else {
      swipedDiff.value =
        (swipeStart.value as TouchEvent).touches[0].clientX -
        (event as TouchEvent).touches[0].clientX;
    }

    if (position.endsWith("left")) {
      swipeStyle.value = {
        ...swipeStyle.value,
        transition: 'none',
        left: `${-swipedDiff.value}px`
      };
    } else {
      swipeStyle.value = {
        ...swipeStyle.value,
        transition: 'none',
        right: `${swipedDiff.value}px`
      };
    }

    if (Math.abs(swipedDiff.value) > 200) {
      onCloseHandler();
    }
  };

  const startSwipeHandler = (event: MouseEvent | TouchEvent) => {
    if (swipeClose === false) return;
    swipeStart.value = event;
    const move = isMouseEvent(event) ? "mousemove" : "touchmove";
    const moveEnd = isMouseEvent(event) ? "mouseup" : "touchend";

    addEventListener(move, swipeHandler);
    addEventListener(moveEnd, () => {
      swipeStart.value = undefined;
      if (position.endsWith("left")) {
        swipeStyle.value = {
          ...swipeStyle.value,
          transition: "left .3s ease-out",
          left: 0
        }
      } else {
        swipeStyle.value = {
          ...swipeStyle.value,
          transition: "right .3s ease-out",
          right: 0
        }
      }
      removeEventListener(move, swipeHandler);
    });
  };

  const cleanUpMove = (move: 'mousemove' | 'touchmove') => {
    if (swipeClose === false) return;
    if (swipeStart.value) swipeStart.value = undefined
    if (swipedDiff.value) swipedDiff.value = undefined
    removeEventListener(move, swipeHandler)
  };

  onUnmounted(() => {
    if (swipeClose === false) return;
    cleanUpMove('mousemove')
    cleanUpMove('touchmove')
  });

  return { swipedDiff, swipeStart, swipeStyle, swipeHandler, startSwipeHandler, cleanUpMove }
}

export default useSwipe