import { createVNode, render } from 'vue'
import { Position, ToastObject, ToastOptions } from '../types';
import Toast from './MToast.vue'

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
  closable: options.closable || defaultOptions.closable,
  position: options.position || defaultOptions.position,
  showIcon: options.showIcon || defaultOptions.showIcon,
  transition: options.transition || defaultOptions.transition,
  onClose: options.onClose
})

export const createToast = (text: string, options?: ToastOptions) => {
  let initializedOptions = defaultOptions;

  if(options) initializedOptions = initializeOptions(options);

  let verticalOffset = 0
  const id = toastId++;

  if(!initializedOptions.position) return;
  toasts[initializedOptions.position].forEach(({ toastVNode }) => {
    const offsetHeight = (toastVNode.el as HTMLElement).offsetHeight
    verticalOffset += (offsetHeight || 0) + 16
  })

  verticalOffset += 16

  const container = document.createElement('div')
  document.body.appendChild(container);

  let toastVNode = null;

  toastVNode = createVNode(Toast, {
    ...initializedOptions,
    text,
    id,
    offset: verticalOffset,
    visible: false,
    onCloseHandler: () => { close(id, initializedOptions.position ? initializedOptions.position : 'top-right') }
  })

  render(toastVNode, container)
  if(!initializedOptions.position) return;

  toasts[initializedOptions.position].push({ toastVNode, container });

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
