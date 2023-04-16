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
    checked: false,
    value: 'world',
    validity: {
      typeMismatch: false,
      valueMissing: false,
      valid: false,
    },
  } as HTMLInputElement;

  class InputTestEvent extends EventTarget {
    id: string;
    name: string;
    type: string;
    readonly: boolean;
    required: boolean;
    checked: boolean;
    value: string | boolean;
    validity: {
      typeMismatch: boolean;
      valueMissing: boolean;
      valid: boolean;
    };

    constructor(data: HTMLInputElement) {
      super();
      this.id = data.id;
      this.name = data.name;
      this.type = data.type;
      this.readonly = data.readOnly;
      this.required = data.required;
      this.value = data.value;
      this.checked = data.checked;
      this.validity = data.validity;
    }
  }

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

  describe('onInput', () => {
    it('should update value for text', async () => {
      const elRef = ref({
        ...baseInput,
        type: 'text',
        value: 'world',
      });
      const wrapper = composableWrapper(() => {
        const inputs = useInputs(elRef);
        return inputs;
      });

      await flushPromises();

      const testEvent = new InputTestEvent(elRef.value);
      testEvent.addEventListener('custom', wrapper.result.onInput);
      const ee = new CustomEvent('custom', {});
      testEvent.dispatchEvent(ee);
      await flushPromises();
      expect(wrapper.result.state.value).toEqual('world');
    });

    it('should update value for password', async () => {
      const elRef = ref({
        ...baseInput,
        type: 'password',
        value: 'password',
      });
      const wrapper = composableWrapper(() => {
        const inputs = useInputs(elRef);
        return inputs;
      });

      await flushPromises();

      const testEvent = new InputTestEvent(elRef.value);
      testEvent.addEventListener('custom', wrapper.result.onInput);
      const ee = new CustomEvent('custom', {});
      testEvent.dispatchEvent(ee);
      await flushPromises();
      expect(wrapper.result.state.value).toEqual('password');
    });

    it('should update value for radio', async () => {
      const elRef = ref({
        ...baseInput,
        type: 'password',
        checked: true,
        value: 'radio check',
      });
      const wrapper = composableWrapper(() => {
        const inputs = useInputs(elRef);
        return inputs;
      });

      await flushPromises();

      const testEvent = new InputTestEvent(elRef.value);
      testEvent.addEventListener('custom', wrapper.result.onInput);
      const ee = new CustomEvent('custom', {});
      testEvent.dispatchEvent(ee);
      await flushPromises();
      expect(wrapper.result.state.value).toEqual('radio check');
    });

    it('should update value for radio', async () => {
      const elRef = ref({
        ...baseInput,
        type: 'checkbox',
        checked: true,
        value: 'should be true',
      });
      const wrapper = composableWrapper(() => {
        const inputs = useInputs(elRef);
        return inputs;
      });

      await flushPromises();

      const testEvent = new InputTestEvent(elRef.value);
      testEvent.addEventListener('custom', wrapper.result.onInput);
      const ee = new CustomEvent('custom', {});
      testEvent.dispatchEvent(ee);
      await flushPromises();
      expect(wrapper.result.state.value).toBeTruthy();
    });

    it('valid text should return valid', async () => {
      const elRef = ref({
        ...baseInput,
        type: 'text',
        value: 'should be valid',
        validity: {
          ...baseInput.validity,
          valid: true,
        },
      });
      const wrapper = composableWrapper(() => {
        const inputs = useInputs(elRef);
        return inputs;
      });

      await flushPromises();

      const testEvent = new InputTestEvent(elRef.value);
      testEvent.addEventListener('custom', wrapper.result.onInput);
      const ee = new CustomEvent('custom', {});
      testEvent.dispatchEvent(ee);
      await flushPromises();
      expect(wrapper.result.state.valid).toBeTruthy();
    });
  });
});
