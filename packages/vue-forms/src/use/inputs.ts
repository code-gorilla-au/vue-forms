import { onMounted, reactive, readonly, Ref, watch } from 'vue';
import { useFormContext, VFormNode } from './forms';
import { resoleUnref, MaybeElement } from './refs';
import { v4 as uuid } from 'uuid';

export interface UseInputOpts {
  initModelValue?: string;
  customValidation?: boolean;
  eagerValidation?: boolean;
}

function checkValidity(required: boolean, validState: ValidityState) {
  if (required) {
    return (
      validState.valid && !validState.typeMismatch && !validState.valueMissing
    );
  }
  return validState.valid && !validState.typeMismatch;
}

function resolveInputValue(node: HTMLInputElement) {
  if (node.type === 'checkbox') {
    return node.checked;
  }

  if (node.type === 'radio') {
    if (!node.checked) {
      return '';
    }
    return node.value;
  }

  return node.value;
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

  const state = reactive<VFormNode>({
    id: '',
    name: '',
    type: '',
    required: false,
    readonly: false,
    disabled: false,
    focused: false,
    dirty: false,
    valid: true,
    validationMessage: '',
    value: '',
  });

  function syncInputRef(newInputRef: MaybeElement) {
    if (!newInputRef) {
      return;
    }

    const el = newInputRef as HTMLInputElement;

    state.id = uuid();
    state.value = opts.initModelValue || '';
    state.dirty = state.value !== '';
    state.type = el.type;
    state.name = el.name;
    state.readonly = el.readOnly;
    state.required = el.required;
    state.valid = checkValidity(state.required, el.validity);

    if (!formContext) {
      return;
    }

    if (!formContext.getNode(state.name)) {
      formContext.registerNode(state.id, state);
    }

    formContext.updateData(state.id);
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
    state.valid = false;
    state.validationMessage = target.validationMessage;

    if (!formContext) {
      return;
    }

    formContext.addValidation(state.id);
  }

  function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    state.value = resolveInputValue(target);
    state.valid = checkValidity(state.required, target.validity);

    if (opts.eagerValidation) {
      target.checkValidity();
    }

    if (!formContext) {
      return;
    }

    formContext.updateData(state.id);
  }

  function onChange(event: Event) {
    onInput(event);
  }

  function focusInputRef() {
    const el = resoleUnref(inputRef);
    if (!el) {
      return;
    }

    (el as HTMLElement).focus();
  }

  onMounted(() => {
    syncInputRef(inputRef.value);
  });

  watch(
    () => {
      return state.valid;
    },
    (isValid) => {
      if (!isValid || !formContext) {
        return;
      }

      state.validationMessage = '';
      formContext.removeValidation(state.id);
    },
  );

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
