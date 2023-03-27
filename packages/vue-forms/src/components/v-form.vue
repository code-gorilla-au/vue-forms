<script lang="ts">
import { defineComponent, reactive, readonly } from 'vue';
import { createFormContext } from '../use/forms';

export default defineComponent({
  name: 'VForm',
  emits: {
    /**
     * form submit event
     */
    submit: null,
  },
  setup(_, { emit }) {
    const api = createFormContext({});

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
