import * as val from './validations';

describe('rules', () => {
  describe('email', () => {
    it('should return true for valid email', () => {
      expect(val.ruleEmail('m@m.com')).toBeTruthy();
    });
    it('should return true for valid email', () => {
      expect(val.ruleEmail('m@m.co')).toBeTruthy();
    });
    it('should return true for valid email', () => {
      expect(val.ruleEmail('@m.co')).toBeFalsy();
    });
    it('should return true for valid email', () => {
      expect(val.ruleEmail('mu@m.collide')).toBeFalsy();
    });
  });

  describe('not', () => {
    it('should not return true if input contains arg', () => {
      expect(val.ruleNot('value of the input', 'the')).toBeTruthy();
    });
    it('should not return false if input does not contains arg', () => {
      expect(val.ruleNot('value of the input', 'ash')).toBeFalsy();
    });
    it('should not return true if input contains multiple args', () => {
      expect(val.ruleNot('value of the input', 'value', 'input')).toBeTruthy();
    });
  });

  describe('is', () => {
    it('should return false if input contains arg', () => {
      expect(val.ruleIs('value of the input', 'the')).toBeFalsy();
    });
    it('should return true if input does not contain arg', () => {
      expect(val.ruleIs('value of the input', 'gone')).toBeTruthy();
    });
  });

  describe('prefix', () => {
    it('should return true if input contains arg', () => {
      expect(val.rulePrefix('should have prefix', 'should')).toBeTruthy();
    });
    it('should return true if input contains one of the args', () => {
      expect(
        val.rulePrefix('should have prefix', 'gall', 'should'),
      ).toBeTruthy();
    });
    it('should return false if input does contain the args', () => {
      expect(val.rulePrefix('should have prefix', 'flex', 'wink')).toBeFalsy();
    });
  });

  describe('suffix', () => {
    it('should return true if input contains arg', () => {
      expect(val.ruleSuffix('should have suffix', 'suffix')).toBeTruthy();
    });
    it('should return true if input contains arg', () => {
      expect(
        val.ruleSuffix('should have suffix', 'host', 'suffix'),
      ).toBeTruthy();
    });
    it('should return false if input does not contain arg', () => {
      expect(val.ruleSuffix('should have suffix', 'host', 'gone')).toBeFalsy();
    });
  });
});

describe('parse expression', () => {
  it('should return rule: not with arg: input', () => {
    expect(val.parseExpression('input value', 'not:input')).toEqual([
      {
        rule: 'not',
        value: 'input value',
        ruleArgs: ['input'],
      },
    ]);
  });
  it('should return rule: not with arg: input, with extra spaces', () => {
    expect(val.parseExpression('input value', ' not : input ')).toEqual([
      {
        rule: 'not',
        value: 'input value',
        ruleArgs: ['input'],
      },
    ]);
  });
  it('should return rule: not with arg: input, wrong token', () => {
    expect(val.parseExpression('input value', ' not.input ')).toEqual([
      {
        rule: 'not.input',
        value: 'input value',
        ruleArgs: [],
      },
    ]);
  });
  it('should return rule: not with arg: input , with duplicated token', () => {
    expect(val.parseExpression('input value', 'not::input')).toEqual([
      {
        rule: 'not',
        value: 'input value',
        ruleArgs: [],
      },
    ]);
  });
  it('should return rule: not with arg: input, value', () => {
    expect(val.parseExpression('input value', 'not:input,value')).toEqual([
      {
        rule: 'not',
        value: 'input value',
        ruleArgs: ['input', 'value'],
      },
    ]);
  });
  it('should return rule: not with arg: input, value, with duplicated token', () => {
    expect(val.parseExpression('input value', 'not:input,,value')).toEqual([
      {
        rule: 'not',
        value: 'input value',
        ruleArgs: ['input', '', 'value'],
      },
    ]);
  });
  it('should return rules [not:input,value] and [email]', () => {
    expect(val.parseExpression('input value', 'not:input,value|email')).toEqual(
      [
        {
          rule: 'not',
          value: 'input value',
          ruleArgs: ['input', 'value'],
        },
        {
          rule: 'email',
          value: 'input value',
          ruleArgs: [],
        },
      ],
    );
  });
});

describe('validations', () => {
  describe('rules', () => {
    it('should have default rules', () => {
      const list = val.validations();
      [
        val.RULE_NAME_EMAIL,
        val.RULE_NAME_IS,
        val.RULE_NAME_NOT,
        val.RULE_NAME_PREFIX,
        val.RULE_NAME_RULE_NOT_FOUND,
        val.RULE_NAME_SUFFIX,
      ].forEach((rule) => {
        list.availableRules().includes(rule);
      });
    });
  });
});
