<script lang="ts">
import { defineComponent } from 'vue';
import { UIInput, UICheckbox } from '@code-gorilla-au/vue-forms-ui';

export default defineComponent({
  name: 'BasicForm',
  components: { UIInput, UICheckbox },
  setup() {
    return {};
  },
});
</script>

<template>
  <div>
    <UIInput
      id="singleinput"
      name="singleInput"
      label="hello"
      type="email"
      required
    />
    <UICheckbox id="checkboxInput" name="checkboxInput" required>
      <p>hello</p>
    </UICheckbox>
  </div>
</template>

<style scoped></style>
