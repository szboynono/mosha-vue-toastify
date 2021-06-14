import * as testFile from '../../lib/createToast'
import { ToastOptions, ToastObject } from '../../lib/types'

test('initializeOptions should initialize the options', () => {
  const options: ToastOptions = {}
  const result = testFile.initializeOptions(options)
  expect(result).toEqual({
    hideProgressBar: false,
    position: "top-right",
    showCloseButton: undefined,
    showIcon: undefined,
    swipeClose: undefined,
    timeout: 5000,
    transition: "bounce",
    type: "default",
  })
})

test('initializeContent should initialize content', () => {
  expect(testFile.initializeContent('hey')).toEqual({ text: 'hey', description: undefined})
})

test('moveToastsOnAdd should move the toasts', () => {
  const options: ToastOptions = {
    position: 'top-center'
  }
  const ToastObject1: ToastObject = {
    toastVNode: {
      el: {
        offsetHeight: 12
      }
    } as any,
    container: {} as any
  }

  const toasts = {
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-right': [],
    'top-center': [ToastObject1],
    'bottom-center': []
  }
  const result = testFile.moveToastsOnAdd(options, toasts as any, 12);
  expect(result).toEqual(36);
})

test('setupVNodeProps should setup the props for VNode', () => {
  const mockClose = jest.fn()
  const result = testFile.setupVNodeProps({} as any, 1, 12, mockClose, {} as any);
  const obj = {
    id: 1,
    offset: 12,
    visible: false,
    onCloseHandler: () => {
      mockClose(1, 'top-right')
    }
  }
  expect(result.id).toEqual(obj.id)
  expect(result.offset).toEqual(obj.offset)
  expect(result.visible).toEqual(obj.visible)
})