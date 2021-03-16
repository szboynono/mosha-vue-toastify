import { createVNode, render } from 'vue'
import Toast from './toast.vue'

export type ToastType = 'info' | 'danger' | 'warning' | 'success' | 'default'

export type Position =  'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'| 'top-center' | 'bottom-center'

export type TransitionType = 'bounce' | 'flip' | 'slide'

export interface ToastObject {
  toastVNode: any
  container: HTMLDivElement;
}

export interface ToastOptions {
  title?: string,
  text?: string,
  type?: ToastType,
  timeout?: number,
  closable?: Boolean,
  position?: Position,
  showIcon?: Boolean,
  transition?: TransitionType,
  onClose?: () => void
}

const toasts: Record<Position, ToastObject[]> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
  'top-center': [],
  'bottom-center': [],
}

let toastId = 0;

export const createToast = (options: ToastOptions | string) => {
  let verticalOffset = 0
  const id = toastId++;
  const position = typeof options === 'string' ? 'top-right' : options.position || 'top-right'
  const transition = typeof options === 'string' ? 'bounce' : options.transition || 'bounce'

  toasts[position].forEach(({ toastVNode }) => {
    const offsetHeight = (toastVNode.el as HTMLElement).offsetHeight
    verticalOffset += (offsetHeight || 0) + 16
  })

  verticalOffset += 16

  const container = document.createElement('div')
  document.body.appendChild(container);

  let toastVNode = null;

  if(typeof options === 'string') {
    toastVNode = createVNode(Toast, {
      text: options,
      id,
      offset: verticalOffset,
      position,
      transition,
      visible: false,
      onCloseHandler: () => { close(id, position)}
    })
  } else {
    toastVNode = createVNode(Toast, {
      ...options,
      id,
      offset: verticalOffset,
      position,
      transition,
      visible: false,
      onCloseHandler: () => { close(id, position)}
    })
  }
  
  render(toastVNode, container)
  toasts[position].push({ toastVNode, container });

  if (toastVNode.component) {
    toastVNode.component.props.visible = true
  }
}

const close = (id: number, position: Position) => {
  const toastArr = toasts[position];

  const index = toastArr.findIndex(({ toastVNode }) => id === toastVNode.props.id)

  if (index === -1) return ;
  const { container, toastVNode } = toastArr[index] as ToastObject;
  
  const height = toastVNode.el.offsetHeight;

  toasts[position].splice(index, 1)
  toastVNode.component.props.visible = false;

  for (let i = index; i < toastArr.length; i++) {
    const { toastVNode } = toastArr[i] as ToastObject;

    if (!toastVNode.el) return;
    
    const verticalPos: string = position.split('-')[0] || 'top'
    const pos = parseInt(toastVNode.el.style[verticalPos], 10) - height - 16;

    if (!toastVNode.component) return;
    toastVNode.component.props.offset = pos
  }

  setTimeout(() => {
    render(null, container)
    document.body.removeChild(container)
  }, 1000)
}
