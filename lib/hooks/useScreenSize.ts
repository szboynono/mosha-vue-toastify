import { onMounted, onUnmounted, Ref, ref } from 'vue';
import { debounce } from '../util'
const useScreenSize = (): {
  width: Ref<number>,
  height: Ref<number>
} => {
  const width = ref<number>(-1);
  const height = ref<number>(-1);


  const resizeHandler = (e: Event) => {
    if (e !== null && e.currentTarget !== null) {
      width.value = (e.currentTarget as Window).innerWidth
      height.value = (e.currentTarget as Window).innerHeight
    }
  }

  onMounted(() => {
    if (window.innerWidth > 0) {
      width.value = window.innerWidth
      height.value = window.innerHeight
    }
    window.addEventListener("resize", debounce(resizeHandler))
  })

  onUnmounted(() => {
    window.removeEventListener("resize", debounce(resizeHandler))
  })

  return {
    width,
    height
  }
}

export default useScreenSize;