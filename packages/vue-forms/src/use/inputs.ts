import { onMounted, reactive, readonly, Ref, watch } from 'vue';
import { EVENT_UPDATE_DATA, useFormContext, VFormNode } from './forms';
import { resolveUnref, MaybeElement } from './refs';
import { v4 as uuid } from 'uuid';
import { useListContext } from './lists';

export interface UseInputOpts {
  initModelValue?: string;
  validationRules?: string;
  customValidation?: boolean;
}

function checkInitValidity(required: boolean, validState: ValidityState) {
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
    validationRules: undefined,
    customValidation: false,
  },
) {
  const formContext = useFormContext();
  const listContext = useListContext();

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
    namespace: undefined,
  });

  /**
   * run validation rules based on input options
   * @param el input ref
   */
  function runValidationRules(el: HTMLInputElement) {
    state.valid = checkInitValidity(state.required, el.validity);
    if (state.valid) {
      state.validationMessage = '';
    }

    if (opts?.customValidation || !opts?.validationRules) {
      return;
    }

    if (!formContext || typeof state.value !== 'string') {
      return;
    }

    const msg = formContext.validate(state.value, opts.validationRules);
    if (msg) {
      state.valid = false;
      state.validationMessage = msg;
    }
  }

  async function syncInputRef(newInputRef: MaybeElement) {
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
    runValidationRules(el);

    if (listContext) {
      state.namespace = listContext.namespace;
    }

    if (!formContext) {
      return;
    }

    if (!formContext.getNode(state.name)) {
      formContext.registerNode(state);
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

    runValidationRules(target);
  }

  function onInvalid(event: Event) {
    const target = event.target as HTMLInputElement;
    state.valid = false;
    state.validationMessage = target.validationMessage;
  }

  function onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    state.value = resolveInputValue(target);

    runValidationRules(target);
  }

  function onChange(event: Event) {
    onInput(event);
  }

  function focusInputRef() {
    const el = resolveUnref(inputRef);
    if (!el) {
      return;
    }

    (el as HTMLElement).focus();
  }

  onMounted(() => {
    syncInputRef(inputRef.value);
  });

  watch(state, async (newState) => {
    if (!formContext) {
      return;
    }

    await formContext.dispatch(EVENT_UPDATE_DATA, newState);
  });

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
