import { inject, provide, reactive, readonly } from 'vue';

export interface VFormData {
  [key: string]: string | number;
}

export interface VFormContext {
  readonly data: VFormData;
  /**
   * update the data property.
   * @param key name of the data property to update
   * @param value value of the data property to update
   */
  // eslint-disable-next-line no-unused-vars
  updateDataProperty(key: string, value: string): void;
  registerNode(id: string): void;
}

function useFormApi(initFormData = {}) {
  if (typeof initFormData !== 'object') {
    throw new Error('initFormData is valid');
  }

  const formNodes = reactive({});

  const initClone = JSON.parse(JSON.stringify(initFormData));
  const formData = reactive(initClone);

  return {
    nodes: readonly(formNodes),
    data: readonly(formData),
    registerNode(id: string): void {
      if (formNodes[id]) {
        throw Error(`${id} already exists`);
      }
      formData[id] = '';
    },
    updateDataProperty(key: string, value: string) {
      formData[key] = value;
    },
  };
}

const KEY_V_FORM_CONTEXT = Symbol('--v-form-context');

/**
 *
 * @param ctx provide form context to child inputs
 */
export function provideFormContext(ctx: VFormContext): void {
  provide(KEY_V_FORM_CONTEXT, ctx);
}

export function useFormContext(): VFormContext | undefined {
  return inject(KEY_V_FORM_CONTEXT);
}
