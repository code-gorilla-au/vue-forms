import { computed, reactive, unref, ComponentPublicInstance, watch } from 'vue';
import { MaybeElementRef, VueInstance } from './common-types';

export interface UseInputOpts {
  customMessage: boolean;
}

export function useInputs(
  inputRef: MaybeElementRef<HTMLElement | ComponentPublicInstance>,
) {
  const inputState = reactive({
    required: false,
    disabled: false,
    focused: false,
    dirty: false,
    valid: true,
    validationMessage: '',
    value: '',
  });

  const hasInput = computed(() => {
    const rawEl = unref(inputRef);
    const el = (rawEl as VueInstance)?.$el ?? rawEl;
    return el !== undefined;
  });

  return {
    required: inputState.required,
    disabled: inputState.disabled,
    dirty: inputState.dirty,
    focused: inputState.focused,
    valid: inputState.valid,
    validationMessage: inputState.validationMessage,
    value: inputState.value,
    hasInput,
  };
}
