<template>
  <span class="mosha__icon">
    <svg
      v-if="type === 'warning'"
      xmlns="http://www.w3.org/2000/svg"
      height="32px"
      viewBox="0 0 24 24"
      width="32px"
      fill="#ffffff"
    >
      <path
        d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3zM12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"
      />
    </svg>
    <svg
      v-else-if="type === 'danger'"
      xmlns="http://www.w3.org/2000/svg"
      height="32px"
      viewBox="0 0 24 24"
      width="32px"
      fill="#ffffff"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"
      />
    </svg>
    <svg
      v-else-if="type === 'success'"
      xmlns="http://www.w3.org/2000/svg"
      height="32px"
      viewBox="0 0 24 24"
      width="32px"
      fill="#ffffff"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"
      />
    </svg>
    <svg
      v-else-if="type === 'default'"
      xmlns="http://www.w3.org/2000/svg"
      height="32px"
      viewBox="0 0 24 24"
      width="32px"
      fill="#616161"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      height="32px"
      viewBox="0 0 24 24"
      width="32px"
      fill="#ffffff"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
      />
    </svg>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ToastType } from '../types'
export default defineComponent({
  props: {
    type: {
      type: String as PropType<ToastType>,
      default: 'default'
    }
  }
})
</script>
