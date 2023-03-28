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
    const inputs = useInputs(inputRef, { initModelValue: props.modelValue });

    watch(
      () => {
        return inputs.state.value;
      },
      (newValue) => {
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
  <div class="">
    <input
      ref="inputRef"
      v-bind="$attrs"
      :name="name"
      :value="inputs.state.value"
      @input="inputs.onInput"
      @blur="inputs.onBlur"
      @focus="inputs.onFocus"
      @invalid="inputs.onInvalid"
    />
    <span> {{ inputs.state.validationMessage }}</span>
  </div>
</template>
