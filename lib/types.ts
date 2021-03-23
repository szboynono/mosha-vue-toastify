export type ToastType = 'info' | 'danger' | 'warning' | 'success' | 'default'

export type Position =  'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'| 'top-center' | 'bottom-center'

export type TransitionType = 'bounce' | 'flip' | 'slide'

export type ToastContent = string | {
  title: string,
  description?: string
}

export interface ToastObject {
  toastVNode: any
  container: HTMLDivElement;
}

export interface ToastOptions {
  type?: ToastType,
  timeout?: number,
  showCloseButton?: boolean,
  position?: Position,
  showIcon?: boolean,
  transition?: TransitionType,
  hideProgressBar?: boolean,
  toastBackgroundColor?: string,
  swipeClose?: boolean,
  onClose?: () => void
}