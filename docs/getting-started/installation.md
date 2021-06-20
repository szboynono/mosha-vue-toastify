# Installation

With NPM:

```bash
$ npm install mosha-vue-toastify
```

With Yarn:

```bash
$ yarn add mosha-vue-toastify
```

## Just import and use it (Recommended)

Get your toast working real quick! fast and easy!

```html
<template>
  <button @click="toast">Toast it!</button>
</template>
```
```ts
<script lang='ts'>
import { defineComponent } from 'vue'
// import the library
import { createToast } from 'mosha-vue-toastify';
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css'

export default defineComponent({
  name: 'HelloWorld',
  setup () {
    const toast = () => {
        createToast('Wow, easy')
    }
    return { toast }
  }
})
</script>
```

## Use it as a plugin

```ts
/* main.ts */
import { createApp } from 'vue'
import App from './App.vue'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

const app = createApp(App)
app.use(moshaToast)
app.mount('#app')
```

```ts
<script lang="ts">
export default defineComponent({
  name: 'HelloWorld',
  methods: {
    run() {
      this.$moshaToast('Hmm..not as easy huh')
    }
  }
})
</script>
```

## Use it as a injection token

```ts
/* main.ts */
import { createApp } from 'vue'
import App from './App.vue'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

const app = createApp(App)
app.use(moshaToast)
app.mount('#app')
```

```ts
<script lang="ts">
export default defineComponent({
  name: 'HelloWorld',
  inject: ['moshaToast'],
  methods: {
    run() {
      this.moshaToast('hmm..not as easy huh')
    }
  }
})
</script>
```