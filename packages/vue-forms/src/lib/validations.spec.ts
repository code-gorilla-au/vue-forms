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
    it('should return false if input contains arg', () => {
      expect(val.ruleNot('value of the input', 'the')).toBeFalsy();
    });
    it('should return true if input does not contains arg', () => {
      expect(val.ruleNot('value of the input', 'ash')).toBeTruthy();
    });
    it('should return true if input contains multiple args', () => {
      expect(val.ruleNot('value of the input', 'flash', 'gordon')).toBeTruthy();
    });
  });

  describe('is', () => {
    it('should return true if input contains arg', () => {
      expect(val.ruleIs('value of the input', 'the')).toBeTruthy();
    });
    it('should return true if input contains arg', () => {
      expect(val.ruleIs('value of the input', 'the', 'gone')).toBeTruthy();
    });
    it('should return false if input does not contain arg', () => {
      expect(val.ruleIs('value of the input', 'gone')).toBeFalsy();
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
  const expectedRules = [
    val.RULE_NAME_EMAIL,
    val.RULE_NAME_IS,
    val.RULE_NAME_NOT,
    val.RULE_NAME_PREFIX,
    val.RULE_NAME_SUFFIX,
    val.RULE_NAME_RULE_NOT_FOUND,
  ];

  describe('rules', () => {
    it('should have default rules', () => {
      const list = val.validations();
      expectedRules.forEach((rule) => {
        list.availableRules().includes(rule);
      });
    });
  });

  describe('evaluate', () => {
    const ex = val.validations();
    it('email', () => {
      const result = ex.evaluate('m@m.com', 'email');
      expect(result).toBeUndefined();
    });
    it('is', () => {
      const result = ex.evaluate('is rule', 'is:rule');
      expect(result).toBeUndefined();
    });
    it('not', () => {
      const result = ex.evaluate('not rule', 'not:flash');
      expect(result).toBeUndefined();
    });
    it('prefix', () => {
      const result = ex.evaluate('flash rule', 'prefix:flash');
      expect(result).toBeUndefined();
    });
    it('suffix', () => {
      const result = ex.evaluate('not flash', 'suffix:flash');
      expect(result).toBeUndefined();
    });
    it('not found', () => {
      const result = ex.evaluate('not flash', 'unknown:flash');
      expect(result).toEqual('Rule not found');
    });
  });
});
