import './tailwind.postcss'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Code from './components/Code.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component(Code.name, Code)
  }
}