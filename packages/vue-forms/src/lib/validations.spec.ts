import * as val from './validations';

describe('email', () => {
  it('should return true for valid email', () => {
    expect(val.validateEmail('m@m.com')).toBeTruthy();
  });
  it('should return true for valid email', () => {
    expect(val.validateEmail('m@m.co')).toBeTruthy();
  });
  it('should return true for valid email', () => {
    expect(val.validateEmail('@m.co')).toBeFalsy();
  });
  it('should return true for valid email', () => {
    expect(val.validateEmail('mu@m.collide')).toBeFalsy();
  });
});
