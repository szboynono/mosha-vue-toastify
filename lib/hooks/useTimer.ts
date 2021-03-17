import { onUnmounted, ref } from 'vue'

const useTimer = (callback: Function | string, delay: number) => {
  const timerId = ref<number>()
  const startTime = ref<number>(0)
  const remainingTime = ref<number>(delay)

  const intervalId = ref<number>()
  const progress =ref(100)

  const stop = () => {
    clearInterval(intervalId.value)
    clearTimeout(timerId.value)
    remainingTime.value -= Date.now() - startTime.value;
  }

  const start = () => {
    startTime.value = Date.now()
    clearTimeout(timerId.value)
    intervalId.value = setInterval(() => {
      progress.value--
    }, delay / 100 - 2)
    timerId.value = setTimeout(callback, remainingTime.value)
  }

  const clear = () => {
    clearInterval(intervalId.value)
    clearTimeout(timerId.value)
  }

  onUnmounted(() => {
    clear()
  })

  return { start, stop, clear, progress }
}

export default useTimer