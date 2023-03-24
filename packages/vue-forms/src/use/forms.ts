export interface VFormData {
  [key: string]: string;
}

export interface VFormContext {
  data: VFormData;
}
export const KEY_V_FORM_CONTEXT = Symbol('--v-form-context');
