import { unref, Ref, ComponentPublicInstance } from 'vue';

export type MaybeRef<T> = Ref<T> | T;

export type MaybeElementRef<T extends MaybeElement = MaybeElement> =
  MaybeRef<T>;

export type MaybeElement =
  | HTMLElement
  | HTMLInputElement
  | SVGElement
  | ComponentPublicInstance
  | undefined
  | null;

export type VueInstance = ComponentPublicInstance;

export function unrefHasElement(elRef: MaybeElementRef) {
  const rawEl = unref(elRef);
  const el = (rawEl as VueInstance)?.$el ?? rawEl;
  return el !== undefined;
}

export function resoleUnref<T>(ref: MaybeRef<T>): T {
  const rawEl = unref(ref);
  return (rawEl as VueInstance)?.$el ?? rawEl;
}
