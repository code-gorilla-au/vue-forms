import { dispatcher } from './dispatch';

describe('dispatcher', () => {
  it('should register topic', () => {
    const d = dispatcher();
    d.subscribe('hello', () => {
      return;
    });
    const topics = d.topics();
    expect(topics).toContain('hello');
  });
  it('should invoke function', async () => {
    let count = 0;
    const d = dispatcher();
    d.subscribe('hello', () => {
      count += 1;
    });
    await d.dispatch('hello', {
      id: '1',
      timestamp: Date.now(),
      payload: 'hello',
    });
    expect(count).toEqual(1);
  });
});
