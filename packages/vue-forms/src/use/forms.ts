import { inject, provide, reactive, readonly } from 'vue';

export interface VFormData {
  [key: string]: string | number;
}

export interface VFormNode {
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
  /**
   * update the data property.
   * @param key name of the data property to update
   * @param value value of the data property to update
   */
  // eslint-disable-next-line no-unused-vars
  updateDataProperty(key: string, value: string | number): void;
  registerNode(id: string, node: VFormNode): void;
}

function useFormApi(initFormData = {}): VFormContextApi {
  if (typeof initFormData !== 'object') {
    throw new Error('initFormData is not valid');
  }

  const formNodes: VFormNodes = reactive({});

  const initClone = JSON.parse(JSON.stringify(initFormData));
  const formData = reactive(initClone);

  return {
    nodes: readonly(formNodes),
    data: readonly(formData),
    registerNode(id: string, node: VFormNode): void {
      if (formNodes[id]) {
        throw Error(`${id} already exists`);
      }
      formData[id] = '';
      formNodes[id] = node;
    },
    updateDataProperty(key: string, value: string | number) {
      formData[key] = value;
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
  return inject(KEY_V_FORM_CONTEXT);
}
