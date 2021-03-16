export type ToastType = 'info' | 'danger' | 'warning' | 'success' | 'default'

export type Position =  'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'| 'top-center' | 'bottom-center'

export type TransitionType = 'bounce' | 'flip' | 'slide'

export interface ToastObject {
  toastVNode: any
  container: HTMLDivElement;
}

export interface ToastOptions {
  type?: ToastType,
  timeout?: number,
  closable?: Boolean,
  position?: Position,
  showIcon?: Boolean,
  transition?: TransitionType,
  onClose?: () => void
}