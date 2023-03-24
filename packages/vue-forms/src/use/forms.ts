export interface VFormData {
  [key: string]: string;
}

export interface VFormContext {
  data: VFormData;
}
const KEY_V_FORM = Symbol('--v-form-context');
