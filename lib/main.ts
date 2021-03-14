import { App } from '@vue/runtime-core';
import { createToast } from './components/createToast'

export type MoshaToastFn = () => void

export default {
  install: (app: App, options: any) => {
    app.config.globalProperties.$moshaToast = createToast;
    app.provide<MoshaToastFn>('moshaToast', createToast)
  }
}


