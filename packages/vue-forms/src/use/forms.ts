import {
  inject,
  provide,
  reactive,
  readonly,
  computed,
  ComputedRef,
} from 'vue';

export interface VFormData {
  [key: string]: string | number;
}

export interface VFormValidations {
  [key: string]: string | undefined;
}

export interface VFormNode {
  id: string;
  name: string;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  focused: boolean;
  dirty: boolean;
  valid: boolean;
  validationMessage: string;
  value: string | boolean | object;
}

export interface VFormNodes {
  [key: string]: VFormNode;
}

export interface VFormContextApi {
  readonly nodes: VFormNodes;
  readonly data: VFormData;
  readonly validations: VFormValidations;
  readonly formValid: ComputedRef<boolean>;
  registerNode(id: string, node: VFormNode): void;
  getNode(id: string): VFormNode;
  updateData(field: string, value: string | boolean | object): void;
  addValidation(field: string, message: string): void;
  removeValidation(field: string): void;
}

function evaluateNodeValidity(node: VFormNode) {
  return node.valid;
}

function useFormApi(initFormData = {}): VFormContextApi {
  if (typeof initFormData !== 'object') {
    throw new Error('initFormData is not valid');
  }

  const formNodes = reactive<VFormNodes>({});
  const formValidations = reactive<VFormValidations>({});
  const formData = reactive(JSON.parse(JSON.stringify(initFormData)));

  const formValid = computed(() => {
    return Object.values(formNodes).every(evaluateNodeValidity);
  });

  return {
    nodes: readonly(formNodes),
    data: readonly(formData),
    formValid,
    validations: readonly(formValidations),

    registerNode(id: string, node: VFormNode): void {
      if (formNodes[id]) {
        throw Error(`${id} already exists`);
      }
      formData[id] = '';
      formNodes[id] = node;
    },
    getNode(id: string): VFormNode {
      return formNodes[id];
    },
    updateData(field: string, value: string) {
      formData[field] = value;
    },
    addValidation(field: string, message: string) {
      formValidations[field] = message;
    },
    removeValidation(field: string) {
      formValidations[field] = undefined;
    },
  };
}

const KEY_V_FORM_CONTEXT = Symbol('--v-form-context');

/**
 *
 * @param ctx provide form context to child inputs
 */
export function createFormContext(initFormData: object = {}) {
  const api = useFormApi(initFormData);
  provide(KEY_V_FORM_CONTEXT, api);
  return api;
}

export function useFormContext(): VFormContextApi | undefined {
  return inject(KEY_V_FORM_CONTEXT, undefined);
}
