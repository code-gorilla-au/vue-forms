import { ref } from 'vue';
import { composableWrapper } from '../lib/test-fixtures';
import { useInputs } from './inputs';

/**
 * @vitest-environment jsdom
 */

describe('useInputs()', () => {
  it('should load', () => {
    const elRef = ref({} as HTMLElement);
    const wrapper = composableWrapper(() => {
      return useInputs(elRef);
    });
    expect(wrapper.result).toEqual('foo');
  });
});
