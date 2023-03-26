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
  // eslint-disable-next-line no-unused-vars
  updateDataProperty(key: string, value: string): void;
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
