import { unref } from 'vue';
import { MaybeElementRef, MaybeRef, VueInstance } from './common-types';

export function unrefHasElement(elRef: MaybeElementRef) {
  const rawEl = unref(elRef);
  const el = (rawEl as VueInstance)?.$el ?? rawEl;
  return el !== undefined;
}

export function resoleUnref<T>(ref: MaybeRef<T>): T {
  const rawEl = unref(ref);
  return (rawEl as VueInstance)?.$el ?? rawEl;
}
