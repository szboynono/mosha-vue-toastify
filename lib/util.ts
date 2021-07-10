import { Component, createVNode, VNode, VNodeProps } from 'vue';

export const withProps = (component: Component, props: (Record<string, unknown> & VNodeProps)): VNode => {
  return createVNode(component, props);
}