import { hello } from './main';

describe('hello', () => {
  it('should say hello', () => {
    expect(hello()).toEqual('hello');
  });
});
