import { ref } from 'vue'

export const useTimer = (callback: Function | string, delay: number) => {
  const timerId = ref<number>()
  const start = ref<number>()
  const remaining = ref<number>(delay)

  const pause = () => {
    clearTimeout(timerId.value)
  }

  const resume = () => {
    start.value = Date.now()
    clearTimeout(timerId.value)
    timerId.value = setTimeout(callback, remaining.value)
  }

  resume()

  return { pause, resume}
}