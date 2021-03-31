import { App } from '@vue/runtime-core'
import { createToast } from './components/createToast'
import './index.scss'

export * from './components/createToast'

export default {
  // eslint-disable-next-line
  install: (app: App) => {
    app.config.globalProperties.$moshaToast = createToast
    app.provide('moshaToast', createToast)
  }
}
