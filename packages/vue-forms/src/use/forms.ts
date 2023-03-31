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

/**
 * checks if node has a valid name, otherwise returns an id
 */
function resolveFieldName(node: VFormNode) {
  return node.name === '' ? node.id : node.name;
}

export interface VFormContextApi {
  readonly nodes: VFormNodes;
  readonly data: VFormData;
  readonly validations: VFormValidations;
  readonly formValid: ComputedRef<boolean>;
  /**
   * register an input node with the form context
   * @param id unique id
   * @param node form node
   */
  registerNode(id: string, node: VFormNode): void;
  /**
   * get input node by id
   * @param id unique id
   */
  getNode(id: string): VFormNode;
  /**
   * update form data with the new values from the node
   * @param id unique id
   */
  updateData(id: string): void;
  /**
   * add validation message from the node
   * @param id unique id
   */
  addValidation(id: string): void;
  /**
   * remove validation message
   * @param id unique id
   */
  removeValidation(id: string): void;
}

function evaluateNodeValidity(node: VFormNode) {
  return node.valid;
}

function useFormApi(initFormData = {}): VFormContextApi {
  if (typeof initFormData !== 'object') {
    throw new Error('initFormData is not valid');
  }

  function getNode(id: string): VFormNode {
    return formNodes[id];
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
      formNodes[id] = node;

      const fieldName = resolveFieldName(node);
      formData[fieldName] = '';
    },
    getNode: getNode,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateData(id: string) {
      const node = getNode(id);
      if (!node) {
        throw Error(`${id} input not registered`);
      }
      const fieldName = resolveFieldName(node);
      formData[fieldName] = node.value;
    },
    addValidation(id: string) {
      const node = getNode(id);
      const fieldName = resolveFieldName(node);
      formValidations[fieldName] = node.validationMessage;
    },
    removeValidation(id: string) {
      const node = getNode(id);
      const fieldName = resolveFieldName(node);
      formValidations[fieldName] = undefined;
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
