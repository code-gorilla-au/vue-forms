import { createApp, h, ref } from 'vue';
import { useInputs } from './inputs';

/**
 * @vitest-environment jsdom
 */

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
      // eslint-disable-next-line @typescript-eslint/no-empty-function, prettier/prettier
      render() { },
    };

    const app = {
      render() {
        return h(child, { ref: 'child' });
      },
    };

    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    const tmpApp = createApp(app);
    const vm = tmpApp.mount(root);

    return {
      result: vm?.$refs?.child.wrapper() as T,
      unmount: () => {
        document.removeChild(root);
        tmpApp.unmount();
      },
    };
  }

  it('should load', () => {
    const elRef = ref({} as HTMLElement);
    const wrapper = composableWrapper(() => {
      return useInputs(elRef);
    });
    expect(wrapper.result).toEqual('foo');
  });
});
