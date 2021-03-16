import { onUnmounted, ref } from 'vue'

export const useTimer = (callback: Function | string, delay: number) => {
  const timerId = ref<number>()
  const startTime = ref<number>(0)
  const remainingTime = ref<number>(delay)

  const stop = () => {
    clearTimeout(timerId.value)
    remainingTime.value -= Date.now() - startTime.value;
  }

  const start = () => {
    startTime.value = Date.now()
    clearTimeout(timerId.value)
    timerId.value = setTimeout(callback, remainingTime.value)
  }

  onUnmounted(() => {
    clearTimeout(timerId.value)
  })

  return { start, stop, remainingTime }
}