import { CSSProperties, onUnmounted, Ref, ref } from 'vue'
import { SWIPE_ACTIVE_DIFF } from '../config'
import { Position } from '../types'

const useSwipe = (
  position: Position,
  onCloseHandler: () => void,
  swipeClose: boolean
): {
  swipedDiff: Ref<number | undefined>
  swipeStart: Ref<MouseEvent | TouchEvent | undefined>
  swipeStyle: Ref<CSSProperties | undefined>
  swipeHandler: (event: MouseEvent | TouchEvent) => void
  startSwipeHandler: (event: MouseEvent | TouchEvent) => void
  cleanUpMove: (move: 'mousemove' | 'touchmove') => void
} => {
  const swipeStart = ref<MouseEvent | TouchEvent>()
  const swipedDiff = ref<number | undefined>(undefined)
  const swipeStyle = ref<CSSProperties>()

  const isMouseEvent = (event: MouseEvent | TouchEvent): boolean =>
    event instanceof MouseEvent

  const swipeHandler = (event: MouseEvent | TouchEvent) => {
    if (swipeClose === false || !swipeStart.value) return

    if (isMouseEvent(event)) {
      swipedDiff.value =
        (swipeStart.value as MouseEvent).clientX - (event as MouseEvent).clientX
    } else {
      swipedDiff.value =
        (swipeStart.value as TouchEvent).touches[0].clientX -
        (event as TouchEvent).touches[0].clientX
    }

    swipeStyle.value = {
      ...swipeStyle.value,
      transition: 'none'
    }

    if (position.endsWith('left')) {
      swipeStyle.value.left = `${-swipedDiff.value}px !important`
    } else if (position.endsWith('right')) {
      swipeStyle.value.right = `${swipedDiff.value}px !important`
    } else {
      if (swipedDiff.value > 0) {
        swipeStyle.value.left = `${-swipedDiff.value}px !important`
      } else {
        swipeStyle.value.right = `${swipedDiff.value}px !important`
      }
    }

    if (Math.abs(swipedDiff.value) > SWIPE_ACTIVE_DIFF) {
      onCloseHandler()
    }
  }

  const moveEndHandler = (move: 'mousemove' | 'touchmove') => {
    const resetLeft: CSSProperties = {
      transition: 'left .3s ease-out',
      left: 0
    }

    const resetRight: CSSProperties = {
      transition: 'right .3s ease-out',
      right: 0
    }

    const resetCenter: CSSProperties = {
      transition: 'all .3s ease-out',
      left: 0,
      right: 0
    }

    if (position.endsWith('left')) {
      swipeStyle.value = {
        ...swipeStyle.value,
        ...resetLeft
      }
    } else if (position.endsWith('right')) {
      swipeStyle.value = {
        ...swipeStyle.value,
        ...resetRight
      }
    } else {
      swipeStyle.value = {
        ...swipeStyle.value,
        ...resetCenter
      }
    }
    swipeStart.value = undefined
    swipedDiff.value = undefined
    removeEventListener(move, swipeHandler)
  }

  const startSwipeHandler = (event: MouseEvent | TouchEvent) => {
    if (swipeClose === false) return
    swipeStart.value = event
    const move = isMouseEvent(event) ? 'mousemove' : 'touchmove'
    const moveEnd = isMouseEvent(event) ? 'mouseup' : 'touchend'

    addEventListener(move, swipeHandler)
    addEventListener(moveEnd, () => moveEndHandler(move))
  }

  const cleanUpMove = (move: 'mousemove' | 'touchmove') => {
    if (swipeClose === false) return
    if (swipeStart.value) swipeStart.value = undefined
    if (swipedDiff.value) swipedDiff.value = undefined
    removeEventListener(move, swipeHandler)
  }

  onUnmounted(() => {
    if (swipeClose === false) return
    cleanUpMove('mousemove')
    cleanUpMove('touchmove')
  })

  return {
    swipedDiff,
    swipeStart,
    swipeStyle,
    swipeHandler,
    startSwipeHandler,
    cleanUpMove
  }
}

export default useSwipe
