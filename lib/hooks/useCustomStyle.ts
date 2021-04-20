import { computed, ComputedRef, CSSProperties } from 'vue'
import { Position } from '../types'

const useCustomStyle = (
  position: Position,
  offset: number,
  bgColor: string
): { customStyle: ComputedRef<CSSProperties> } => {
  const customStyle = computed<CSSProperties>(() => {
    switch (position) {
      case 'top-left':
        return {
          left: '0',
          top: `${offset}px`
        }
      case 'bottom-left':
        return {
          left: '0',
          bottom: `${offset}px`
        }
      case 'bottom-right':
        return {
          right: '0',
          bottom: `${offset}px`
        }
      case 'top-center':
        return {
          top: `${offset}px`,
          left: '0',
          right: '0',
          marginRight: 'auto',
          marginLeft: 'auto'
        }
      case 'bottom-center':
        return {
          bottom: `${offset}px`,
          left: '0',
          right: '0',
          marginRight: 'auto',
          marginLeft: 'auto'
        }
      default:
        return {
          right: '0',
          top: `${offset}px`
        }
    }
  })
  if (bgColor.length > 0) {
    ;(customStyle.value as CSSProperties).backgroundColor = bgColor
  }
  return { customStyle }
}

export default useCustomStyle
