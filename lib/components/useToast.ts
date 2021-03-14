import { createVNode, render } from 'vue'
import Toast from './toast.vue'

export type ToastType = 'info' | 'danger' | 'warning' | 'success' | 'default'

export type Position =  'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface ToastObject {
  toastVNode: any
  container: HTMLDivElement;
}

export interface ToastOptions {
  title: string,
  description?: string,
  type?: ToastType,
  timeout?: number,
  closable?: Boolean,
  position?: Position,
  showIcon?: Boolean,
  onClose?: () => void
}

const toasts: Record<Position, ToastObject[]> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
}

let toastId = 0;

export const useToast = (options: ToastOptions) => {
  let verticalOffset = 0
  const id = toastId++;
  const position = options.position || 'top-right'

  toasts[position].forEach(({ toastVNode }) => {
    const offsetHeight = (toastVNode.el as HTMLElement).offsetHeight
    verticalOffset += (offsetHeight || 0) + 16
  })

  verticalOffset += 16

  const container = document.createElement('div')
  document.body.appendChild(container);

  const toastVNode = createVNode(Toast, {
    ...options,
    id,
    offset: verticalOffset,
    position,
    visible: false,
    onCloseHandler: () => { close(id, position)}
  })
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

  setTimeout(() => {
    render(null, container)
    document.body.removeChild(container)
  }, 300)

  for (let i = index; i < toastArr.length; i++) {
    const { toastVNode } = toastArr[i] as ToastObject;

    if (!toastVNode.el) return;
    
    const verticalPos: string = position.split('-')[0] || 'top'
    const pos = parseInt(toastVNode.el.style[verticalPos], 10) - height - 16;

    if (!toastVNode.component) return;
    toastVNode.component.props.offset = pos
  }
}
