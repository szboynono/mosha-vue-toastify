import { createVNode, render } from 'vue'
import Toast from './toast.vue'

export const createToast = () => {
  const container = document.createElement('div')
  document.body.appendChild(container);

  const toastVNode = createVNode(Toast)
  render(toastVNode, container)
}

Toast.install = (app: any) => {
  app.config.globalProperties.$notify = Toast
}

export default Toast