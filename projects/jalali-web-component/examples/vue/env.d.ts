/// <reference types="vue" />

declare module 'vue' {
  export function ref<T>(value: T): { value: T };
  export function reactive<T extends object>(target: T): T;
  export function computed<T>(getter: () => T): { value: T };
  export function watch<T>(source: T, callback: (newVal: T, oldVal: T) => void): void;
  export function onMounted(callback: () => void): void;
  export function onUnmounted(callback: () => void): void;
  export interface DefineComponent<Props = {}, Emits = {}, Data = {}> {
    new (): any;
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
