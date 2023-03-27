import {
  computed,
  reactive,
  unref,
  ComponentPublicInstance,
} from 'vue';
import { MaybeElementRef, VueInstance } from './common-types';

export interface UseInputOpts {
  customMessage: boolean;
}

export function useInputs(
  inputRef: MaybeElementRef<HTMLElement | ComponentPublicInstance>,
  opts: UseInputOpts,
) {
  const inputState = reactive({
    focused: false,
    dirty: false,
    valid: true,
    validationMessage: '',
  });

  const hasInput = computed(() => {
    const rawEl = unref(inputRef);
    const el = (rawEl as VueInstance)?.$el ?? rawEl;
    return el !== undefined;
  });

  return {
    dirty: inputState.dirty,
    focused: inputState.focused,
    valid: inputState.valid,
  };
}
