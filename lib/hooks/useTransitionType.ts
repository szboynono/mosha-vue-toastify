import { Position, TransitionType } from '../components/createToast'
import { computed } from 'vue'

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

const useTransitionType = (position: Position, transition: TransitionType) => {
  const transitionType = computed(() => TRANSITION_MAP[position][transition])
  return { transitionType }
}

export default useTransitionType