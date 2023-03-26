import { computed, reactive, unref } from 'vue';
import { MaybeRef } from './common-types';

export interface UseInputOpts {
  customMessage: boolean;
}

export function useInputs(
  inputRef: MaybeRef<HTMLInputElement>,
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
    const el = rawEl?.$el ?? rawEl;
  });
}
