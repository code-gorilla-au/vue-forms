import { defineComponent, h, ref, watch } from 'vue';
import { useInputs } from '../use/inputs';
import { computed } from 'vue';

export default defineComponent({
  name: 'VInput',
  props: {
    /**
     * type of input
     */
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    /**
     * name of the input
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * model value
     */
    modelValue: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * value used for input type 'radio'
     */
    value: {
      type: String,
      required: false,
    },
  },
  emits: {
    /**
     * update model value
     */
    'update:modelValue': null,
    /**
     * input validation message
     */
    'update:validationMessage': null,
  },
  setup(props, { emit, attrs }) {
    const inputRef = ref<HTMLInputElement | null>(null);
    const inputs = useInputs(inputRef, { initModelValue: props.modelValue });

    const resolveValue = computed(() => {
      if (!inputRef.value || inputRef.value?.type !== 'radio') {
        return inputs.state.value;
      }
      return props.value;
    });

    watch(
      () => {
        return inputs.state.value;
      },
      (newValue) => {
        emit('update:modelValue', newValue);
      },
    );

    watch(
      () => {
        return inputs.state.validationMessage;
      },
      (newMsg) => {
        emit('update:validationMessage', newMsg);
      },
    );

    h('input', {
      ...attrs,
      type: props.type,
      name: props.name,
      value: resolveValue,
      onInput: inputs.onInput,
      onChange: inputs.onChange,
      onBlur: inputs.onBlur,
      onFocus: inputs.onFocus,
      onInvalid: inputs.onInvalid,
      default: () => {
        return {
          validationMessage: inputs.state.validationMessage,
        };
      },
    });
    return {
      inputRef,
      inputs,
      resolveValue,
    };
  },
});
