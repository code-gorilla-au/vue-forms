/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createApp, h } from 'vue';

interface WrapperComponent<T> {
  setup(): {
    wrapper: () => T;
  };
  render(): void;
}

export function composableWrapper<T>(fn: () => T) {
  const child: WrapperComponent<T> = {
    setup() {
      function wrapper() {
        return fn();
      }
      return {
        wrapper,
      };
    },
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

  const component = vm.$refs.child as WrapperComponent<T>;

  return {
    result: component.wrapper(),
    unmount: () => {
      document.removeChild(root);
      tmpApp.unmount();
    },
  };
}
