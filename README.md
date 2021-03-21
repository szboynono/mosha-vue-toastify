# Mosha Vue Toastify

A light weight and fun Vue 3 toast or notification or snack bar or however you wanna call it library.

A demo is comming.

## Installation

With NPM:

```bash
$ npm install mosha-vue-toastify
```

With Yarn:

```bash
$ yarn add mosha-vue-toastify
```

## The gist
```html
<template>
  <button @click="toast">Toast it!</button>
</template>
```
```ts
<script lang='ts'>
import { defineComponent } from 'vue'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const toast = () => {
        createToast('Wow, easy')
    }
    return { toast }
  }
})
</script>
```
