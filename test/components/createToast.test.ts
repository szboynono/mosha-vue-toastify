import { ToastOptions } from '../../lib/types';
import { initializeOptions } from '../../lib/components/createToast'

test('initializeOptions should initilize the options', () => {
  const options: ToastOptions = {}
  const result = initializeOptions(options)
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