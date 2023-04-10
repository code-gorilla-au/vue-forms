/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentPublicInstance, createApp, defineComponent, h } from 'vue';

interface WrapperComponent<T> extends ComponentPublicInstance {
  setup(): {
    wrapper: () => T;
  };
  wrapper: () => T;
}

export function composableWrapper<T>(fn: () => T) {
  const child = defineComponent({
    setup() {
      const result = fn();
      function wrapper() {
        return result;
      }
      return {
        wrapper,
      };
    },
    render() { }
  });

  const app = {
    render() {
      return h(child, { ref: 'child' });
    },
  };

  const root = document.createElement('div');
  const tmpApp = createApp(app);
  const vm = tmpApp.mount(root);

  const component = vm.$refs.child as WrapperComponent<T>;

  return {
    result: component.wrapper(),
    unmount: () => {
      tmpApp.unmount();
    },
  };
}

export function flushPromises() {
  return new Promise((resolve) => {
    setTimeout(resolve);
  });
}
