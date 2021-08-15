## Configuration

The `createToast` function accepts 2 arguments:

- **First argument**: 
  - It can be just a string or a object like this: `{ title: 'some title', description: 'some good description'}`. By the way, description now accepts html, for more customization, we recommand trying out the custom component approach
  - It can also accept a Vue 3 component or a VNode if you need more customization, e.g.
  ```ts
    // without props
    import { createToast } from 'mosha-vue-toastify';
    import CustomizedContent from "./CustomizedContent.vue";
    import 'mosha-vue-toastify/dist/style.css';

    export default defineComponent({
      setup () {
        const toast = () => {
            createToast(CustomizedContent)
        }
        return { toast }
      }
    })
  ```
  ```ts
    // with props
    import { createToast, withProps } from 'mosha-vue-toastify';
    import CustomizedContent from "./CustomizedContent.vue";
    import 'mosha-vue-toastify/dist/style.css';

    export default defineComponent({
      setup () {
        const toast = () => {
            createToast(withProps(CustomizedContent, { yourFavProp: 'bruh' }))
        }
        return { toast }
      }
    })
  ```

- **Second argument**: the second argument is an options object.

    | name        | type           | default  | description |
    | ------------- |:-------------:| -----:| -----:|
    | type      | 'info', 'danger', 'warning', 'success', 'default' | 'default' | Give the toast different styles and icons. |
    | timeout      | number      |   5000 | How many ms you want the toggle to close itself?
    | position      | 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center' |   'top-right' | Where do you want the toast to appear? |
    | showCloseButton | boolean      |    true | Do you wanna show the close button ? |
    | showIcon | boolean      |    false | Do you wanna show the icon ? |
    | transition | 'bounce', 'zoom', 'slide' | 'bounce' | Which animation do you want? |
    | hideProgressBar | boolean      |    false | Do we wanna hide the fancy progress bar? |
    | swipeClose | boolean      |    true | Allows the user swipe close the toast |
    | toastBackgroundColor | string      | default color | Customize the background color of the toast. |
    | onClose | function      | N/A | This function will be called at the end of the toast's lifecycle|

- **Programatically closing**
  The `createToast` function returns an object that contains a `close` funtion that allows the user to programatically dismiss the toast. See below:
  ```ts
      import { createToast } from 'mosha-vue-toastify';
      import CustomizedContent from "./CustomizedContent.vue";
      import 'mosha-vue-toastify/dist/style.css';

      export default defineComponent({
        setup () {
          const toast = () => {
              // This close function can be used to close the toast
              const { close } = createToast(CustomizedContent)
              // close()
          }

          return { toast }
        }
      })
  ```
  To clear all the toasts, use the `clearToasts` function. See below
  ```ts
      import { createToast, clearToasts } from 'mosha-vue-toastify';
      import CustomizedContent from "./CustomizedContent.vue";
      import 'mosha-vue-toastify/dist/style.css';

      export default defineComponent({
        setup () {
          const clear = () => {
            // clears all the toasts
            clearToasts()
          }

          return { clear }
        }
      })
  ```