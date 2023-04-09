import { createApp, h } from 'vue';
import { useInputs } from './inputs';

describe('useInputs()', () => {
  function composableWrapper<T>(fn: () => T) {
    const child = {
      setup() {
        function wrapper() {
          return fn();
        }
        return {
          wrapper,
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      render() { },
    };

    const app = {
      render() {
        return h(child, { ref: 'child' });
      },
    };

    const root = document.createElement('div');
    const tmpApp = createApp(app);
    const vm = tmpApp.mount(root);
  }

  it('should load', () => {
    expect('bar').toEqual('foo');
  });
});
