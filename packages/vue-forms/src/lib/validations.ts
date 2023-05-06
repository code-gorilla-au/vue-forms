const TOKEN_RULE_SEPARATOR = '|';
const TOKEN_VALUES_SEPARATOR = ':';
const TOKEN_ARGS_SEPARATOR = ',';
const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

const RULE_NAME_EMAIL = 'email';
const RULE_NAME_NOT = 'not';

export interface ValidationRule {
  rule: string;
  value: string;
  ruleArgs: string[];
}

export type RuleFunction = (value: string, ...args: string[]) => boolean;

export interface RulesRepository {
  [key: string]: {
    handler: RuleFunction;
    validationMessage: string;
  };
}

/**
 * validate email
 * @param value email to validate against
 */
export function ruleEmail(value: string): boolean {
  const matches = value.match(emailRegex);
  return matches !== null && matches?.length > 0;
}

export function ruleNot(value: string, ...args: string[]): boolean {
  return args.some((arg) => {
    return value.includes(arg);
  });
}

export function parseExpression(
  value: string,
  expression: string,
): ValidationRule[] {
  const rules = expression.split(TOKEN_RULE_SEPARATOR);
  return rules.map((ruleExp) => {
    const [rule, args] = ruleExp.split(TOKEN_VALUES_SEPARATOR);
    return {
      rule: rule,
      value: value,
      ruleArgs: args.split(TOKEN_ARGS_SEPARATOR),
    };
  });
}

export function getRuleRepository(): RulesRepository {
  return {
    [RULE_NAME_EMAIL]: {
      handler: ruleEmail,
      validationMessage: 'Email must be valid',
    },
    [RULE_NAME_NOT]: {
      handler: ruleNot,
      validationMessage: 'Not allowed',
    },
  };
}
