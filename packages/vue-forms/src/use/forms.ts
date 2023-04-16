import {
  inject,
  provide,
  reactive,
  readonly,
  computed,
  ComputedRef,
} from 'vue';
import { DispatchEventTopic, dispatcher } from '../lib/dispatch';

export interface VFormData {
  [key: string]: string | number;
}

export interface VFormValidations {
  [key: string]: string | undefined;
}

export interface VFormNode {
  id: string;
  name: string;
  type: string;
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

export const EVENT_UPDATE_DATA: DispatchEventTopic = 'internal.update.data';

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
   * @param node form node
   */
  registerNode(node: VFormNode): void;
  /**
   * get input node by id
   * @param id unique id
   */
  getNode(id: string): VFormNode;
}

function evaluateNodeValidity(node: VFormNode) {
  return node.valid;
}

export function useFormApi(initFormData = {}): VFormContextApi {
  if (typeof initFormData !== 'object') {
    throw new Error('initFormData is not valid');
  }

  function getNode(id: string): VFormNode {
    return { ...formNodes[id] };
  }


  const formDispatcher = dispatcher();
  formDispatcher.subscribe(EVENT_UPDATE_DATA, (opts, payload<VFormNode>) => {
    formNodes[payload.node.id] = node;
    const fieldName = resolveFieldName(node);
    formData[fieldName] = node.value;
    formValidations[fieldName] = node.validationMessage;
  });

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

    registerNode(node: VFormNode): void {
      if (getNode(node.id)) {
        throw Error(`${node.id} already exists`);
      }

      formNodes[node.id] = node;

      const fieldName = resolveFieldName(node);
      formData[fieldName] = '';
    },
    getNode: getNode,
    dispatch: formDispatcher.dispatch,
  };
}

const KEY_V_FORM_CONTEXT = Symbol('--v-form-context');

export function createFormContext(initFormData = {}): VFormContextApi {
  const api = useFormApi(initFormData);
  provide(KEY_V_FORM_CONTEXT, api);
  return api;
}

export function useFormContext(): VFormContextApi | undefined {
  return inject(KEY_V_FORM_CONTEXT, undefined);
}
