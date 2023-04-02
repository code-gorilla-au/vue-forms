<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
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
  setup(props, { emit }) {
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

    return {
      inputRef,
      inputs,
      resolveValue,
    };
  },
});
</script>

<template>
  <input
    ref="inputRef"
    v-bind="$attrs"
    :type="type"
    :name="name"
    :value="resolveValue"
    @input="inputs.onInput"
    @change="inputs.onChange"
    @blur="inputs.onBlur"
    @focus="inputs.onFocus"
    @invalid="inputs.onInvalid"
  />
  <slot :validationMessage="inputs.state.validationMessage" />
</template>
