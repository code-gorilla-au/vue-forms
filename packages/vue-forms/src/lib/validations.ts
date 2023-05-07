export interface ValidationRule {
  rule: string;
  value: string;
  ruleArgs: string[];
}

export type RuleFunction = (value: string, ...args: string[]) => boolean;

export interface Rule {
  handler: RuleFunction;
  validationMessage: string;
}

export interface RulesRepository {
  [key: string]: Rule;
}

const TOKEN_RULE_SEPARATOR = '|';
const TOKEN_VALUES_SEPARATOR = ':';
const TOKEN_ARGS_SEPARATOR = ',';

const RULE_NAME_EMAIL = 'email';
const RULE_NAME_NOT = 'not';
const RULE_NAME_RULE_NOT_FOUND = 'ruleNotFound';

const rules: RulesRepository = {
  [RULE_NAME_EMAIL]: {
    handler: ruleEmail,
    validationMessage: 'Email must be valid',
  },
  [RULE_NAME_NOT]: {
    handler: ruleNot,
    validationMessage: 'Not allowed',
  },
  [RULE_NAME_RULE_NOT_FOUND]: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handler(_value: string, ..._args: string[]) {
      return false;
    },
    validationMessage: 'Rule not found',
  },
};
Object.freeze(rules);

function ruleRepository() {
  return {
    rules,
    get(ruleName: string): Rule {
      const rule: Rule = rules[ruleName];
      if (!rule) {
        return rules[RULE_NAME_RULE_NOT_FOUND];
      }

      return rule;
    },
  };
}

const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

/**
 * rule that validate email
 * @param value email to validate against
 */
export function ruleEmail(value: string): boolean {
  const matches = value.match(emailRegex);
  return matches !== null && matches?.length > 0;
}

/**
 * rule to ensure the input value does not contain the supplied arguments
 * @param value input value to validate against
 * @param args arguments provided to the rule.
 */
export function ruleNot(value: string, ...args: string[]): boolean {
  return args.some((arg) => {
    return value.includes(arg);
  });
}

/**
 * parse the expression and generate the rules to run against the input value.
 * @param value input value
 * @param expression list of rules and arguments to validate against the input
 */
export function parseExpression(
  value: string,
  expression: string,
): ValidationRule[] {
  const rules = expression.split(TOKEN_RULE_SEPARATOR);

  return rules.map((ruleExp) => {
    const [rule, args] = ruleExp.split(TOKEN_VALUES_SEPARATOR);

    let parsedArgs: string[] = [];
    if (args) {
      parsedArgs = args.split(TOKEN_ARGS_SEPARATOR).map((arg) => {
        return arg.trim();
      });
    }

    return {
      rule: rule.trim(),
      value: value,
      ruleArgs: parsedArgs,
    };
  });
}

/**
 * Validations rules engine. Run rules against an input value given an expression.
 * Rule names are in camelCase. If a given rule does not exist, it will not attempt to parse.
 * See available rules for a list.
 *
 * Combine rules using the '|' token (example: 'foo | bar' ).
 *
 * Some rules require arguments, declare the rule first, then ':' follow by comma ',' delimited list (example: 'not:foo,bar')
 *
 *
 * @example
 * ```javascript
 * // test if input value does not contain the words 'hello' or 'world'
 * const expression = 'not:hello,world'
 * const v = validations();
 * v.evaluate('hello bin world', expression);
 *
 *
 * ```
 *
 * ```javascript
 * // test if the input value is a valid email
 * const expression = 'email'
 * const v = validations();
 * v.evaluate('hello@mail.com', expression);
 *
 *
 * ```
 *
 * ```javascript
 * // test if the input value does not contain the word 'hello' and is a valid email
 * const expression = 'not:hello|email'
 * const v = validations();
 * v.evaluate('hello@mail.com', expression);
 *
 *
 * ```
 */
export function validations() {
  const repo = ruleRepository();

  return {
    /**
     * list all available rules for the engine
     */
    availableRules() {
      return Object.keys(repo.rules);
    },
    /**
     * evaluate the input against the rules within the expression.
     * @param inputValue input value to run the rules against
     * @param expression rules expression
     */
    evaluate(inputValue: string, expression: string) {
      const rules = parseExpression(inputValue, expression);

      for (let i = 0; i < rules.length; i += 1) {
        const rule = rules[i];

        const ex = repo.get(rule.rule);
        if (!ex) {
          continue;
        }

        if (!ex.handler(rule.value, ...rule.ruleArgs)) {
          return ex.validationMessage;
        }
      }

      return undefined;
    },
  };
}
