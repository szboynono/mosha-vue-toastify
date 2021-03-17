import { createVNode, render } from 'vue'
import { Position, ToastObject, ToastOptions } from '../types';
import Toast from './toast.vue'

const toasts: Record<Position, ToastObject[]> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
  'top-center': [],
  'bottom-center': [],
}

const defaultOptions: ToastOptions = { type: 'default', timeout: 5000, closable: true, position: 'top-right', showIcon: false, transition: 'bounce' }

let toastId = 0;

const initializeOptions = (options: ToastOptions): ToastOptions => ({
  type: options.type || defaultOptions.type,
  timeout: options.timeout || defaultOptions.timeout,
  closable: options
})

export const createToast = (text: string, options?: ToastOptions) => {
  let initializedOptions: ToastOptions = {
    type: options && options.type ? options.type : defaultOptions.type,
    timeout: options && options.timeout ? options.timeout: defaultOptions.timeout,
    position: options
  }

  
  let verticalOffset = 0
  const id = toastId++;

  toasts[position].forEach(({ toastVNode }) => {
    const offsetHeight = (toastVNode.el as HTMLElement).offsetHeight
    verticalOffset += (offsetHeight || 0) + 16
  })

  verticalOffset += 16

  const container = document.createElement('div')
  document.body.appendChild(container);

  let toastVNode = null;

  toastVNode = createVNode(Toast, {
    text,
    type,
    timeout,
    closable,
    position,
    showIcon,
    transition,
    onClose,
    id,
    offset: verticalOffset,
    visible: false,
    onCloseHandler: () => { close(id, position) }
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

  if (index === -1) return;
  const { container, toastVNode } = toastArr[index] as ToastObject;

  const height = toastVNode.el.offsetHeight;

  toasts[position].splice(index, 1)
  toastVNode.component.props.visible = false;

  if (toastVNode.component.props.onClose) {
    toastVNode.component.props.onClose()
  }

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
