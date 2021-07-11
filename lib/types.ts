import { VNode } from '@vue/runtime-core'
import { Component } from 'vue'

export type ToastType = 'info' | 'danger' | 'warning' | 'success' | 'default'

export type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center'

export type TransitionType = 'bounce' | 'zoom' | 'slide'

export interface ContentObject {
  title: string
  description?: string
}

export interface DisplayContentObject {
  text: string
  description?: string
}

export type ToastContent =
  | string
  | ContentObject
  | Component
  | VNode

export interface ToastObject {
  toastVNode: VNode
  container: HTMLDivElement
}

export interface ToastOptions {
  type?: ToastType
  timeout?: number
  showCloseButton?: boolean
  position?: Position
  showIcon?: boolean
  transition?: TransitionType
  hideProgressBar?: boolean
  useComponentContent?: boolean
  toastBackgroundColor?: string
  swipeClose?: boolean
  onClose?: () => void
} 

export enum ToastContentType {
  TITLE_ONLY, TITLE_DESCRIPTION, COMPONENT, VNODE
}