import { ref } from 'vue';
import { composableWrapper, flushPromises } from '../lib/test-fixtures';
import { useInputs } from './inputs';

/**
 * @vitest-environment jsdom
 */

describe('useInputs()', () => {
  const baseInput = {
    id: '1',
    name: 'flash',
    type: 'password',
    readOnly: false,
    required: false,
    validity: {
      typeMismatch: false,
      valueMissing: false,
      valid: false,
    },
  } as HTMLInputElement;

  describe('core', () => {
    it('should return input state', async () => {
      const elRef = ref({ ...baseInput });
      const wrapper = composableWrapper(() => {
        return useInputs(elRef);
      });

      await flushPromises();

      expect(wrapper.result.state).toHaveProperty('type', 'password');
      expect(wrapper.result.state).toHaveProperty('name', 'flash');
      expect(wrapper.result.state).toHaveProperty('required', false);
      expect(wrapper.result.state).toHaveProperty('disabled', false);
      expect(wrapper.result.state).toHaveProperty('focused', false);
      expect(wrapper.result.state).toHaveProperty('dirty', false);
      expect(wrapper.result.state).toHaveProperty('value', '');
      expect(wrapper.result.state).toHaveProperty('validationMessage', '');
      expect(wrapper.result.state).toHaveProperty('value', '');
      wrapper.unmount();
    });

    it('should return input core listeners', async () => {
      const elRef = ref({ ...baseInput });
      const wrapper = composableWrapper(() => {
        return useInputs(elRef);
      });

      await flushPromises();

      expect(wrapper.result.onInput).toBeDefined();
      expect(wrapper.result.onChange).toBeDefined();
      expect(wrapper.result.focusInputRef).toBeDefined();
    });

    it('should return input additional listeners', async () => {
      const elRef = ref({ ...baseInput });
      const wrapper = composableWrapper(() => {
        return useInputs(elRef);
      });

      await flushPromises();

      expect(wrapper.result.onBlur).toBeDefined();
      expect(wrapper.result.onFocus).toBeDefined();
      expect(wrapper.result.onInvalid).toBeDefined();
    });

    it('custom validation should not return additional listeners', async () => {
      const elRef = ref({ ...baseInput });
      const wrapper = composableWrapper(() => {
        return useInputs(elRef, { customValidation: true });
      });

      await flushPromises();

      expect(wrapper.result.onBlur).toBeUndefined();
      expect(wrapper.result.onFocus).toBeUndefined();
      expect(wrapper.result.onInvalid).toBeUndefined();
    });

    it('should return dirty if already has model value', async () => {
      const elRef = ref({
        ...baseInput,
        type: 'text',
      });
      const wrapper = composableWrapper(() => {
        return useInputs(elRef, { initModelValue: 'foo' });
      });

      await flushPromises();

      expect(wrapper.result.state.dirty).toBeTruthy();
      expect(wrapper.result.state.value).toEqual('foo');
    });
  });
});
