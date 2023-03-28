import { inject, provide, reactive, readonly } from 'vue';

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
  disabled: boolean;
  focused: boolean;
  dirty: boolean;
  valid: boolean;
  validationMessage: string;
  value: string;
}

export interface VFormNodes {
  [key: string]: VFormNode;
}

export interface VFormContextApi {
  readonly nodes: VFormNodes;
  readonly data: VFormData;
  readonly validations: VFormValidations;
  registerNode(id: string, node: VFormNode): void;
  updateData(field: string, value: string): void;
  addValidation(field: string, message: string): void;
  removeValidation(field: string): void;
}

function useFormApi(initFormData = {}): VFormContextApi {
  if (typeof initFormData !== 'object') {
    throw new Error('initFormData is not valid');
  }

  const formNodes = reactive<VFormNodes>({});
  const formValidations = reactive<VFormValidations>({});
  const formData = reactive(JSON.parse(JSON.stringify(initFormData)));

  return {
    nodes: readonly(formNodes),
    data: readonly(formData),
    validations: readonly(formValidations),
    registerNode(id: string, node: VFormNode): void {
      if (formNodes[id]) {
        throw Error(`${id} already exists`);
      }
      formData[id] = '';
      formNodes[id] = node;
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
