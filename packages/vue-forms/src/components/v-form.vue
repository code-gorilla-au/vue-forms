<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { createFormContext } from '@use/forms';

export default defineComponent({
  name: 'VForm',
  emits: {
    /**
     * form submit event
     */
    submit: null,
  },
  props: {
    initFormData: {
      type: Object as PropType<object>,
      required: false,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const api = createFormContext(props.initFormData);

    function emitSubmit() {
      emit('submit', { ...api.data });
    }

    return {
      formData: api.data,
      emitSubmit,
    };
  },
});
</script>

<template>
  <form @submit.stop.prevent="emitSubmit">
    <slot :formData="formData" />
  </form>
</template>
