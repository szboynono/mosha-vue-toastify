import * as testFile from '../../lib/createToast'
import { ToastOptions, ToastObject, ToastContentType } from '../../lib/types'
import * as Vue from 'vue';

describe('creatToasts', () => {

  beforeEach(() => {
    jest.spyOn(Vue, 'render').mockImplementation(jest.fn())
  })

  test('initializeOptions should initialize the options', () => {
    const options: ToastOptions = {
      hideProgressBar: true
    }
    const result = testFile.initializeOptions(options)
    expect(result).toEqual({
      hideProgressBar: true,
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
    expect(testFile.initializeContent('hey')).toEqual({ text: 'hey', description: undefined })
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
  
  describe('createToast', () => {
    test('should work if the content is a VNode', () => {
      jest.spyOn(testFile, 'setupVNode');
      testFile.createToast({ __v_isVNode: true } as any);
      expect(testFile.setupVNode).toHaveBeenCalled()
    })
  
    // test('should work if the content is a component', () => {
    //   jest.spyOn(testFile, 'setupVNode');
    //   testFile.createToast({ render: {} } as any);
    //   expect(testFile.setupVNode).toHaveBeenCalled()
    // })
  
    // test('should initialize content and setup vnode for normal content', () => {
    //   jest.spyOn(testFile, 'setupVNode');
    //   testFile.createToast('test');
    //   expect(testFile.setupVNode).toHaveBeenCalled()
    // })
  })
  
  // test('setupVNode should return a close function with options', () => {
  //   jest.spyOn(testFile, 'close');
  //   const result = testFile.setupVNode(ToastContentType.TITLE_ONLY, {
  //     id: 1,
  //     hideProgressBar: false,
  //     position: "top-right",
  //     showCloseButton: undefined,
  //     showIcon: undefined,
  //     swipeClose: undefined,
  //     timeout: 5000,
  //     transition: "bounce",
  //     type: "default",
  //   } as any, { title: 'title' })
  //   result();
  //   expect(testFile.close).toHaveBeenCalled()
  // })
  
  test('moveToastsOnAdd should throw error if no position', () => {
    expect(() => testFile.moveToastsOnAdd({} as any, {} as any, 2)).toThrow('no position')
  })
  
  describe('moveToastsOnClose', () => {
  
    test('should move on close', () => {
      let mockComponent = {
        props: {
          offset: 0
        }
      }
      testFile.moveToastsOnClose(0, [{toastVNode: {
        el: {
          style: {
            'top': '100'
          }
        },
        component: mockComponent
      },}] as any, 'top-right', 10)
      expect(mockComponent).toEqual({ props: { offset: 78 } })
    })
  
    test('should return if no toastVNode el', () => {
      const result = testFile.moveToastsOnClose(0, [{toastVNode: {}}] as any, 'top-right', 10)
      expect(result).toBeUndefined();
    })
  
    test('should return if no toastVNode component', () => {
      const result = testFile.moveToastsOnClose(0, [{toastVNode: {
        el: {
          style: {
            'top': '100'
          }
        },
      },}] as any, 'top-right', 10)
      expect(result).toBeUndefined();
    })
  })

})