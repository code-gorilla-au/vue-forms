<script lang="ts">
import { defineComponent, reactive, readonly } from 'vue';
import { createFormContext, VFormContext, VFormData } from '../use/forms';

export default defineComponent({
  name: 'VForm',
  emits: {
    /**
     * form submit event
     */
    submit: null,
  },
  setup(_, { emit }) {
    const formData: VFormData = reactive({});

    const ctx: VFormContext = {
      data: readonly(formData),
      updateDataProperty(key, value) {
        formData[key] = value;
      },
    };

    createFormContext(ctx);

    function emitSubmit() {
      emit('submit', formData);
    }

    return {
      ctx,
      emitSubmit,
    };
  },
});
</script>

<template>
  <form @submit.prevent="emitSubmit">
    <slot :ctx="ctx" />
  </form>
</template>
