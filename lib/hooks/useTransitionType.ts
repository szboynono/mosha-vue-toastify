import { Position, TransitionType } from '../types'
import { computed, ComputedRef, Ref } from 'vue'
import { SWIPE_ACTIVE_DIFF } from '../config'

type TransitionMap = { [pos in Position]: { [type in TransitionType]: string } }

const TRANSITION_MAP: TransitionMap = {
  'top-left': {
    bounce: 'mosha__bounceInLeft',
    zoom: 'mosha__zoomIn',
    slide: 'mosha__slideInLeft'
  },
  'top-right': {
    bounce: 'mosha__bounceInRight',
    zoom: 'mosha__zoomIn',
    slide: 'mosha__slideInRight'
  },
  'top-center': {
    bounce: 'mosha__bounceInDown',
    zoom: 'mosha__zoomIn',
    slide: 'mosha__slideInDown'
  },
  'bottom-center': {
    bounce: 'mosha__bounceInUp',
    zoom: 'mosha__zoomIn',
    slide: 'mosha__slideInUp'
  },
  'bottom-right': {
    bounce: 'mosha__bounceInRight',
    zoom: 'mosha__zoomIn',
    slide: 'mosha__slideInRight'
  },
  'bottom-left': {
    bounce: 'mosha__bounceInLeft',
    zoom: 'mosha__zoomIn',
    slide: 'mosha__slideInLeft'
  }
}

const useTransitionType = (
  position: Position,
  transition: TransitionType,
  swiped: Ref<number>
): { transitionType: ComputedRef<string> } => {
  const transitionType = computed(() => {
    if (swiped.value > SWIPE_ACTIVE_DIFF) {
      return 'mosha__fadeOutLeft'
    } else if (swiped.value < -SWIPE_ACTIVE_DIFF) {
      return 'mosha__fadeOutRight'
    } else {
      return TRANSITION_MAP[position][transition]
    }
  })
  return { transitionType }
}

export default useTransitionType
