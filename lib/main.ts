import { App } from '@vue/runtime-core';
import { useToast } from './components/useToast'
import './index.scss'

export type MoshaToastFn = (options: any) => void

export default {
  install: (app: App, options: any) => {
    app.config.globalProperties.$moshaToast = useToast;
    app.provide<MoshaToastFn>('moshaToast', useToast)
  }
}


