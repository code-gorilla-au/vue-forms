import { inject, provide } from 'vue';

const KEY_V_LIST_CONTEXT = Symbol('--v-list-context');

export interface VListContext {
  namespace: string;
}

export function createListContext({ namespace }: { namespace: string }) {
  provide(KEY_V_LIST_CONTEXT, { namespace });
}

export function useListContext(): VListContext | undefined {
  return inject(KEY_V_LIST_CONTEXT, undefined);
}
