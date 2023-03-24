<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { VFormContext } from '../use/forms';

export default defineComponent({
  name: 'VForm',
  setup() {
    const formCtx: VFormContext = reactive({
      data: {},
    });

    return {
      formCtx,
    };
  },
});
</script>

<template>
  <form>
    <slot :ctx="formCtx" />
  </form>
</template>
