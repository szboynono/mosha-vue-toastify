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

## Configuration

The `createToast` function accepts 2 arguments, the first argument can be just a string or a object like this `{ title: 'some title', description: 'some good description'}`, the second argument is an options object.


Options:

| name        | type           | default  |
| ------------- |:-------------:| -----:|
| type      | `'info' | 'danger' | 'warning' | 'success' | 'default'` | `'default'` |
| timeout      | number      |   5000 |
| position      | `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'| 'top-center' | 'bottom-center'` |   `'top-right'` |
| closable | boolean      |    true |
| showIcon | boolean      |    false |
| transition | `'bounce' | 'flip' | 'slide'`      |    `'bounce'` |
| hideProgressBar | boolean      |    false |
| toastBackgroundColor | string      | default color |
| onClose | function      | N/A |