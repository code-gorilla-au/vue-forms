<script lang="ts">
import { defineComponent } from 'vue';
import { UIInput } from '@code-gorilla-au/vue-forms-ui';

export default defineComponent({
  name: 'BasicForm',
  components: { UIInput },
  setup() {
    return {};
  },
});
</script>

<template>
  <div>
    <UIInput id="singleinput" name="singleInput" label="hello" type="email" />
  </div>
</template>

<style scoped></style>
