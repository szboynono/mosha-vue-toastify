<template>
  <div class="code">
    <div><span class="func-name">createToast</span>( <span class="text">'some text'</span>,  {</div>
    <div class="indent"><span class="property">timeout</span>: 2000,</div>
    <div>})</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Code',
  setup() {
    
  },
})
</script>

<style scoped>
.code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  padding: 1.25rem 1.5rem;
  width: max-content;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur( 30px );
  border: solid 2px transparent;
  background: rgba(255,255,255, 0.5) !important;
  background-clip: padding-box;
  box-shadow: 10px 10px 10px  rgba(46, 54, 68, 0.03);
  border-radius: 8px;
  color: #2D2A2E;
}
.indent {
  margin-left: 16px;
}

.func-name {
  color: #F92672;
}

.text {
  color: #646cff;
}

.property {
  color: #A6E22E;
}

</style>
