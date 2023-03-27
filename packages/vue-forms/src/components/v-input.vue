<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
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
    const inputRef: Ref<HTMLElement | null> = ref(null);
    const formApi = useFormContext();
    const inputs = useInputs(inputRef);

    function emitModelValue(event: Event) {
      const target = event.target as HTMLInputElement;

      if (formApi) {
        formApi.updateDataProperty(props.name, target.value);
      }
      if (props?.modelValue) {
        emit('update:modelValue', target.value);
      }
    }

    return {
      emitModelValue,
      inputRef,
    };
  },
});
</script>

<template>
  <input
    ref="inputRef"
    :name="name"
    :value="modelValue"
    @input="emitModelValue"
  />
</template>
