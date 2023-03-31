<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useInputs } from '../use/inputs';

export default defineComponent({
  name: 'VInput',
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String],
      required: false,
      default: undefined,
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
  setup(props, { emit }) {
    const inputRef = ref(null);
    const inputs = useInputs(inputRef, { initModelValue: props.modelValue });

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
    v-bind="$attrs"
    :name="name"
    :value="inputs.state.value"
    @input="inputs.onInput"
    @change="inputs.onChange"
    @blur="inputs.onBlur"
    @focus="inputs.onFocus"
    @invalid="inputs.onInvalid"
  />
  <slot :validationMessage="inputs.state.validationMessage" />
</template>
