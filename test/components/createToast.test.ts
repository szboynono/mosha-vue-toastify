import * as testFile from '../../lib/components/createToast'
import { ToastOptions } from '../../lib/types'

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
