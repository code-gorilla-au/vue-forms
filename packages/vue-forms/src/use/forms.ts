import { inject, provide } from 'vue';

export interface VFormData {
  [key: string]: string;
}

export interface VFormContext {
  readonly data: VFormData;
  /**
   * update the data property.
   * @param key name of the data property to update
   * @param value value of the data property to update
   */
  updateDataProperty(key: string, value: string): void;
}

const KEY_V_FORM_CONTEXT = Symbol('--v-form-context');

/**
 *
 * @param ctx provide form context to child inputs
 */
export function createFormContext(ctx: VFormContext): void {
  provide(KEY_V_FORM_CONTEXT, ctx);
}

export function useFormContext(componentName: string): VFormContext {
  const api: VFormContext | undefined = inject(KEY_V_FORM_CONTEXT);
  if (!api) {
    throw new Error(
      `${componentName} requires to be within the context of v-form`,
    );
  }

  return api;
}
