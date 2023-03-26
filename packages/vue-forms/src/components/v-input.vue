<script lang="ts">
import { defineComponent } from 'vue';
import { useFormContext } from '../use/forms';

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
    const ctx = useFormContext();

    function emitModelValue(event: Event) {
      const target = event.target as HTMLInputElement;

      if (ctx) {
        ctx.updateDataProperty(props.name, target.value);
      }
      if (props?.modelValue) {
        emit('update:modelValue', target.value);
      }
    }

    return {
      emitModelValue,
    };
  },
});
</script>

<template>
  <input :name="name" :value="modelValue" @input="emitModelValue" />
</template>
