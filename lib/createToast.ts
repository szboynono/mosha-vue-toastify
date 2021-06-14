import { createVNode, Component, render } from 'vue'
import { DEFAULT_OPTIONS, TOAST_GAP } from './config'
import { Position, ToastObject, ToastOptions, ToastContent, ContentObject, DisplayContentObject } from './types'
import Toast from './components/MToast.vue'

const toasts: Record<Position, ToastObject[]> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
  'top-center': [],
  'bottom-center': []
}

let toastId = 0

export const createToast = (
  content: ToastContent,
  options?: ToastOptions
): void => {
  if (!content) return
  const initializedOptions = options
    ? initializeOptions(options)
    : DEFAULT_OPTIONS

  // eslint-disable-next-line no-prototype-builtins
  if (content.hasOwnProperty('render')) {
    setupVNode(initializedOptions, content as Component)
    return;
  }
  const initializedContent = initializeContent(content)
  setupVNode(initializedOptions, initializedContent)
}

export const setupVNode = (
  options: ToastOptions,
  content: DisplayContentObject | Component
): void => {
  const verticalOffset = moveToastsOnAdd(options, toasts, TOAST_GAP)
  const id = toastId++

  const container = document.createElement('div')
  document.body.appendChild(container)

  let toastVNode = undefined;
  // eslint-disable-next-line no-prototype-builtins
  if (!content.hasOwnProperty('render')) {
    toastVNode = createVNode(
      Toast,
      setupVNodeProps(options, id, verticalOffset, close, content as DisplayContentObject),
    )
  } else {
    toastVNode = createVNode(
      Toast,
      setupVNodeProps(options, id, verticalOffset, close),
      () => [createVNode(content)]
    )
  }
  render(toastVNode, container)


  if (!options.position) return
  toasts[options.position].push({ toastVNode, container })

  if (toastVNode.component) {
    toastVNode.component.props.visible = true
  }
}

// eslint-disable-next-line
export const setupVNodeProps = (
  options: ToastOptions,
  id: number,
  offset: number,
  closeFn: (id: number, position: Position) => void,
  content?: DisplayContentObject,
) => {
  return {
    ...options,
    ...content,
    id,
    offset,
    visible: false,
    onCloseHandler: () => {
      closeFn(id, options.position ? options.position : 'top-right')
    }
  }
}

export const initializeOptions = (options: ToastOptions): ToastOptions => {
  const processedOptions: ToastOptions = {
    ...options,
    type: options.type || DEFAULT_OPTIONS.type,
    timeout: options.timeout || DEFAULT_OPTIONS.timeout,
    showCloseButton: options.showCloseButton,
    position: options.position || DEFAULT_OPTIONS.position,
    showIcon: options.showIcon,
    swipeClose: options.swipeClose,
    transition: options.transition || DEFAULT_OPTIONS.transition
  }

  processedOptions.hideProgressBar =
    processedOptions.timeout !== undefined && processedOptions.timeout <= 0
  if (options.hideProgressBar !== undefined) {
    processedOptions.hideProgressBar = options.hideProgressBar
  }
  return processedOptions
}

export const initializeContent = (
  content: ToastContent
): DisplayContentObject => {
  const text = typeof content === 'string' ? content : (content as ContentObject).title

  const description =
    typeof content === 'string' ? undefined : (content as ContentObject).description

  return { text, description }
}

export const moveToastsOnAdd = (options: ToastOptions, toasts: Record<Position, ToastObject[]>, toastGap: number): number => {
  let verticalOffset = toastGap

  if (!options.position) throw new Error('no position')
  toasts[options.position].forEach(({ toastVNode }) => {
    const offsetHeight = (toastVNode.el as HTMLElement).offsetHeight + toastGap
    verticalOffset += offsetHeight || 0
  })
  return verticalOffset
}

const moveToastsOnClose = (
  index: number,
  toastArr: ToastObject[],
  position: Position,
  toastHeight: number
) => {
  for (let i = index; i < toastArr.length; i++) {
    const { toastVNode } = toastArr[i] as ToastObject

    if (!toastVNode.el) return

    const verticalPos: string = position.split('-')[0] || 'top'
    const pos =
      parseInt(toastVNode.el.style[verticalPos], 10) - toastHeight - TOAST_GAP

    if (!toastVNode.component) return
    toastVNode.component.props.offset = pos
  }
}

export const close = (id: number, position: Position): void => {
  const toastArr = toasts[position]

  const index = toastArr.findIndex(
    ({ toastVNode }) => toastVNode.props && id === toastVNode.props.id
  )

  if (index === -1) return
  const { container, toastVNode } = toastArr[index] as ToastObject
  if (!toastVNode.el) return
  const height = toastVNode.el.offsetHeight

  toasts[position].splice(index, 1)
  moveToastsOnClose(index, toastArr, position, height)

  if (!toastVNode.component) return
  toastVNode.component.props.visible = false

  if (toastVNode.component.props.onClose) {
    // eslint-disable-next-line
    ; (toastVNode.component.props as any).onClose()
  }

  setTimeout(() => {
    render(null, container)
    document.body.removeChild(container)
  }, 1000)
}
