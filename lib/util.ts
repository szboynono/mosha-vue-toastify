import { Component, createVNode, VNode } from 'vue';

export const withProps = (component: Component, props: (Record<string, unknown>)): VNode => {
  return createVNode(component, props);
}