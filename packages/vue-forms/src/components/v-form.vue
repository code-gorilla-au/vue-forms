<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  export default defineComponent({
    name: 'VForm',
    setup() {
      const formCtx = reactive({})

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
