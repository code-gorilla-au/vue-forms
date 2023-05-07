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
  it('should return rule: not with arg: input, value', () => {
    expect(val.parseExpression('input value', 'not:input,value')).toEqual([
      {
        rule: 'not',
        value: 'input value',
        ruleArgs: ['input', 'value'],
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
