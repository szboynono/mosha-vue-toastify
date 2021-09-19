import { createVNode, Component, render, VNode } from 'vue'
import { DEFAULT_OPTIONS, TOAST_GAP } from './config'
import { Position, ToastObject, ToastOptions, ToastContent, ContentObject, DisplayContentObject, ToastContentType } from './types'
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

/**
 * Creates a toast based on content and options
 * 
 * @param content can be a content object with title and description or a Vue component or just plain text.
 * @param options options for the toast, please refer to the README for more details
 * @returns an object contains the close function that can be used to dismiss the toast
 */
export const createToast = (
  content: ToastContent,
  options?: ToastOptions
): { close: () => void } => {
  const id = toastId++;

  const initializedOptions = options
    ? initializeOptions(options)
    : DEFAULT_OPTIONS
  

  if ((content as any).__v_isVNode) {
    setupVNode(id, ToastContentType.VNODE, initializedOptions, content as Component)
    return {
      close: () => close(id, initializedOptions.position as Position)
    }
  }
  // eslint-disable-next-line no-prototype-builtins
  if (content.hasOwnProperty('render')) {
    setupVNode(id, ToastContentType.COMPONENT, initializedOptions, content as Component)
    return {
      close: () => close(id, initializedOptions.position as Position)
    }
  }
  const initializedContent = initializeContent(content)
  setupVNode(id, ToastContentType.TITLE_DESCRIPTION, initializedOptions, initializedContent)

  return {
    close: () => close(id, initializedOptions.position as Position)
  }
}


export const setupVNode = (
  id: number,
  contentType: ToastContentType,
  options: ToastOptions,
  content: DisplayContentObject | Component | VNode
): void => {
    setTimeout(() => {
      const verticalOffset = moveToastsOnAdd(options, toasts, TOAST_GAP)
    
      const container = document.createElement('div')
      document.body.appendChild(container)
    
      let toastVNode = undefined;
    
      if (contentType === ToastContentType.VNODE) {
        toastVNode = createVNode(
          Toast,
          setupVNodeProps(options, id, verticalOffset, close),
          () => [content]
        )
      } else if (contentType === ToastContentType.TITLE_DESCRIPTION) {
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
    
      toasts[options.position as Position].push({ toastVNode, container })
    
      if (toastVNode.component) {
        toastVNode.component.props.visible = true
      }
      
    }, 1);
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

export const moveToastsOnClose = (
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

/**
 * Clear all the toasts
 */
export const clearToasts = (): void => {
  Object.entries(toasts).forEach(([key, val]) => {
    if (val.length > 0) {
      const ids = val.map(toast => {
        return (toast.toastVNode.props as any).id
      })
      ids.forEach(id => {
        close(id, key as Position)
      })
    }
  })
}