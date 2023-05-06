import * as val from './validations';

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
