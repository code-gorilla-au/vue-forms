import { readonly } from 'vue';
import { getRuleRepository, parseExpression } from '../lib/validations';

export function useValidations() {
  const repo = getRuleRepository();

  return {
    repo: readonly(repo),
    parse(inputValue: string, expression: string) {
      const rules = parseExpression(inputValue, expression);
      for (let i = 0; i < rules.length; i += 1) { }
    },
  };
}
