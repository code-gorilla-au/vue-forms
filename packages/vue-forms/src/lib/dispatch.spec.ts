import { dispatcher } from './dispatch';

describe('it', () => {
  it('should subscribe', () => {
    const d = dispatcher();
    d.subscribe('hello', () => {
      console.log('hello');
    });
  });
});
