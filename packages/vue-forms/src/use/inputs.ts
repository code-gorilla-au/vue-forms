import { onMounted, reactive, readonly, Ref, watch } from 'vue';
import { useFormContext, VFormNode } from '@use/forms';
import { resoleUnref, MaybeElement } from '@use/refs';

export interface UseInputOpts {
  initModelValue?: string;
  customValidation?: boolean;
  eagerValidation?: boolean;
}

export function useInputs(
  inputRef: Ref<MaybeElement>,
  opts: UseInputOpts = {
    initModelValue: undefined,
    eagerValidation: false,
  },
) {
  const formContext = useFormContext();

  const state = reactive<VFormNode>({
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

  function initUseInputs() {
    const rawEl = resoleUnref(inputRef);
    if (!rawEl) {
      return;
    }
    const el = rawEl as HTMLInputElement;
    state.id = el.id;
    state.name = el.name;

    if (formContext) {
      formContext.registerNode(state.name, state);
      formContext.updateData(state.name, state.value);
    }
  }

  onMounted(initUseInputs);

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

    if (formContext) {
      formContext.addValidation(state.name, state.validationMessage);
    }
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

  watch(
    () => {
      return state.valid;
    },
    (isValid) => {
      if (!isValid || !formContext) {
        return;
      }

      formContext.removeValidation(state.name);
    },
  );

  return {
    state: readonly(state),
    onInput,
    onChange,
    onBlur,
    onFocus,
    onInvalid,
    focusInputRef,
  };
}
