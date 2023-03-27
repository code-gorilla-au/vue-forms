<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useFormContext } from '../use/forms';
import { useInputs } from '../use/inputs';

export default defineComponent({
  name: 'VInput',
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: false,
      default: undefined,
    },
  },
  emits: {
    /**
     * update model value
     */
    'update:modelValue': null,
  },
  setup(props, { emit }) {
    const inputRef = ref(null);
    const formApi = useFormContext();
    const inputs = useInputs(inputRef, { initModelValue: props.modelValue });

    watch(
      () => {
        return inputs.state.value;
      },
      (newValue) => {
        if (formApi) {
          formApi.updateDataProperty(props.name, newValue as string);
        }
        if (props?.modelValue) {
          emit('update:modelValue', newValue);
        }
      },
    );

    return {
      inputRef,
      inputs,
    };
  },
});
</script>

<template>
  <input
    ref="inputRef"
    :name="name"
    :value="inputs.state.value"
    @input="inputs.onInput"
    @blur="inputs.onBlur"
    @focus="inputs.onFocus"
    @invalid="inputs.onInvalid"
  />
  <p>validation {{ inputs.state.validationMessage }}</p>
</template>
