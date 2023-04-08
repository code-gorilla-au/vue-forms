import { dispatcher } from './dispatch';

describe('dispatcher', () => {
  it('should subscribe', () => {
    const d = dispatcher();
    d.subscribe('hello', () => {
      console.log('hello');
    });
    const topics = d.topics();

    expect(topics).toContain('hello');
  });
});
