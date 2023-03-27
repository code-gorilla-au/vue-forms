import { computed, onMounted, reactive, readonly, Ref, watch } from 'vue';
import { useFormContext } from './forms';
import { MaybeElement } from './common-types';
import { resoleUnref, unrefHasElement } from './refs';

export interface UseInputOpts {
  initModelValue?: string | number;
  customValidation?: boolean;
}

export function useInputs(
  inputRef: Ref<MaybeElement>,
  opts: UseInputOpts = {},
) {
  const formContext = useFormContext();

  const state = reactive({
    id: '',
    name: '',
    required: false,
    disabled: false,
    focused: false,
    dirty: false,
    valid: true,
    validationMessage: '',
    value: opts?.initModelValue || '',
  });

  state.dirty = (opts?.initModelValue && opts.initModelValue !== '') as boolean;

  const hasInput = computed(() => unrefHasElement(inputRef));

  onMounted(() => {
    const rawEl = resoleUnref(inputRef);
    if (!rawEl) {
      return;
    }
    const el = rawEl as HTMLInputElement;
    state.id = el.id;
    state.name = el.name;
    if (formContext) {
      formContext.updateDataProperty(state.name, state.value);
    }
  });

  watch(
    () => {
      return state.value;
    },
    (newValue) => {
      if (formContext) {
        formContext.updateDataProperty(state.name, newValue);
      }
    },
  );

  function onFocus() {
    state.focused = true;
    state.dirty = true;
    state.valid = true;
    state.validationMessage = '';
  }

  function onBlur(event: Event) {
    const target = event.target as HTMLInputElement;

    state.focused = false;
    state.dirty = target?.value !== '';
    state.valid = target?.checkValidity();
  }

  function onInvalid(event: Event) {
    const target = event.target as HTMLInputElement;
    state.validationMessage = target.validationMessage;
  }

  function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    state.value = target.value;
  }

  function onChange(event: Event) {
    onInput(event);
  }

  function focusInputRef() {
    const el = resoleUnref(inputRef);
    if (el) {
      (el as HTMLElement).focus();
    }
  }

  return {
    state: readonly(state),
    hasInput,
    onInput,
    onChange,
    onBlur,
    onFocus,
    onInvalid,
    focusInputRef,
  };
}
