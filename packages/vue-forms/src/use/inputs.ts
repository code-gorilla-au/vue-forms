import { reactive, readonly, Ref, watch } from 'vue';
import { useFormContext } from '@use/forms';
import { resoleUnref, MaybeElement } from '@use/refs';

export interface UseInputOpts {
  initModelValue?: string;
  customValidation?: boolean;
  eagerValidation?: boolean;
}

/**
 * Use inputs composable governs how we react to input events and validations.
 * use inputs state is readonly unless you wish to override it's validation.
 *
 * @example
 * ```javascript
 * // general use
 * const inputs = useInputs(inputRef);
 *  `<input ref="inputRef" :value="inputs.state.value" @input="inputs.onInput" @input="inputs.onChange" @blur="inputs.onBlur" @focus="inputs.onFocus" @invalid="inputs.onInvalid" />`
 *
 *
 * ```
 *
 * ```javascript
 * // Custom validation, state is no longer read only and limited api provided.
 * // Checking if the input is valid, and it's validation message can be updated by changing the state.
 * const {state} = useInputs(inputRef, { customValidation: true });
 * state.valid = false;
 * state.validationMessage = 'why not work?';
 *  `<input ref="inputRef" :value="inputs.state.value" @input="inputs.onInput" @input="inputs.onChange"  />`
 * ```
 */
export function useInputs(
  inputRef: Ref<MaybeElement>,
  opts: UseInputOpts = {
    initModelValue: undefined,
    customValidation: false,
    eagerValidation: false,
  },
) {
  const formContext = useFormContext();

  const state = reactive({
    id: '',
    name: '',
    required: false,
    readonly: false,
    disabled: false,
    focused: false,
    dirty: false,
    valid: true,
    validationMessage: '',
    value: opts?.initModelValue || '',
  });

  state.dirty = state.value !== '';

  function initUseInputs(newInputRef: MaybeElement) {
    if (!newInputRef) {
      return;
    }
    const el = newInputRef as HTMLInputElement;
    state.id = el.id;
    state.name = el.name;
    state.readonly = el.readOnly;
    state.required = el.required;
    state.valid = state.required && state.value !== '';

    if (formContext) {
      formContext.registerNode(state.name, state);
      formContext.updateData(state.name, state.value);
    }
  }

  function onFocus() {
    state.focused = true;
    state.dirty = true;
  }

  function onBlur(event: Event) {
    const target = event.target as HTMLInputElement;

    state.focused = false;
    state.dirty = target?.value !== '';
    state.valid = target.checkValidity();
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
    state.valid = target?.checkValidity();

    if (!formContext) {
      return;
    }

    formContext.updateData(state.name, target.value);

    if (opts.eagerValidation) {
      formContext.addValidation(state.name, target.validationMessage);
    }
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

      state.validationMessage = '';
      formContext.removeValidation(state.name);
    },
  );

  watch(() => {
    return inputRef.value;
  }, initUseInputs);

  if (opts.customValidation) {
    return {
      state,
      onInput,
      onChange,
      focusInputRef,
    };
  }

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
