import { defineComponent, h, ref, watch } from 'vue';
import { useInputs } from '../use/inputs';
import { computed } from 'vue';

export default defineComponent({
  name: 'VSelect',
  props: {
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
     * provide validation rules based on default rules engine.
     */
    validationRules: {
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
  setup(props, { emit, attrs, slots }) {
    const inputRef = ref<HTMLInputElement | null>(null);
    const inputs = useInputs(inputRef, {
      initModelValue: props.modelValue,
      validationRules: props.validationRules,
    });

    const defaultSlots = computed(() => {
      return slots.default && slots.default();
    });

    const validation = computed(() => {
      return (
        slots.validation &&
        slots.validation({
          validationMessage: inputs.state.validationMessage,
        })
      );
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

    return () => {
      return [
        h(
          'select',
          {
            ...attrs,
            ref: inputRef,
            name: props.name,
            onInput: inputs.onInput,
            onChange: inputs.onChange,
            onFocus: inputs.onFocus,
            onInvalid: inputs.onInvalid,
          },
          [defaultSlots.value],
        ),
        validation.value,
      ];
    };
  },
});
