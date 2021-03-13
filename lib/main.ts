import { App } from '@vue/runtime-core';
import { createToast } from './components/createToast'

export default {
  install: (app: App, options: any) => {
    app.config.globalProperties.$moshaToast = createToast;
    app.provide('moshaToast', createToast)
  }
}


