import { onUnmounted, onMounted, ref, Ref } from 'vue'

const useTimer = (
  callback: () => void | string,
  delay: number
): {
  start: () => void
  stop: () => void
  clear: () => void
  progress: Ref<number>
} => {
  const timerId = ref<number>()
  const startTime = ref<number>(0)
  const remainingTime = ref<number>(delay)

  const intervalId = ref<number>()
  const progress = ref(100)

  const stop = () => {
    clearInterval(intervalId.value)
    clearTimeout(timerId.value)
    remainingTime.value -= Date.now() - startTime.value
  }

  const start = () => {
    startTime.value = Date.now()
    clearTimeout(timerId.value)
    intervalId.value = setInterval(() => {
      progress.value--
      // have to -2 because of the transition time
    }, (delay / 100) - 5)
    timerId.value = setTimeout(callback, remainingTime.value)
  }

  const clear = () => {
    clearInterval(intervalId.value)
    clearTimeout(timerId.value)
  }

  onMounted(() => {
    if (delay <= 0) return
  })

  onUnmounted(() => {
    clear()
  })

  return { start, stop, clear, progress }
}

export default useTimer
