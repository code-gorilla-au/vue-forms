<script lang="ts">
import { defineComponent } from 'vue';
import {
  UIInput,
  UICheckbox,
  UIForm,
  UIRadio,
} from '@code-gorilla-au/vue-forms-ui';

export default defineComponent({
  name: 'BasicForm',
  components: { UIInput, UICheckbox, UIForm, UIRadio },
  setup() {
    return {};
  },
});
</script>

<template>
  <UIForm #default="formProps">
    <UIInput
      id="singleInput"
      name="singleInput"
      label="hello"
      type="email"
      required
    />
    <UICheckbox id="checkboxInput" name="checkboxInput" required>
      <p>This is a checkbox</p>
    </UICheckbox>

    <UIRadio
      id="singleUiRadio"
      name="singleUiRadio"
      value="radio value"
      required
    >
      This is a radio
    </UIRadio>
    <pre>
      <code>
        {{ formProps }}
      </code>
    </pre>
  </UIForm>
</template>

<style scoped></style>
