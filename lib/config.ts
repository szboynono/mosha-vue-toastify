import { ToastOptions } from './types'

export const SWIPE_ACTIVE_DIFF = 200
export const TOAST_GAP = 12
export const DEFAULT_OPTIONS: ToastOptions = {
  type: 'default',
  timeout: 5000,
  showCloseButton: true,
  position: 'top-right',
  transition: 'bounce',
  hideProgressBar: false,
  swipeClose: true
}
