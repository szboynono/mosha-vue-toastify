import { App } from '@vue/runtime-core';
import { createToast } from './components/createToast'
import './index.scss'

export type MoshaToastFn = (options: any) => void
export * from './components/createToast'
export default {
  install: (app: App, options: any) => {
    app.config.globalProperties.$moshaToast = createToast;
    app.provide<MoshaToastFn>('moshaToast', createToast)
  }
}