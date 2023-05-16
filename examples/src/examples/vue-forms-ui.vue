<script lang="ts">
import { defineComponent } from 'vue';
import {
  UIInput,
  UICheckbox,
  UIForm,
  UIRadio,
  UISelect,
} from '@code-gorilla-au/vue-forms-ui';

export default defineComponent({
  name: 'BasicForm',
  components: { UIInput, UICheckbox, UIForm, UIRadio, UISelect },
  setup() {
    return {};
  },
});
</script>

<template>
  <UIForm class="flex flex-col w-full max-w-lg" #default="formProps">
    <UIInput
      id="singleInput"
      name="singleInput"
      label="hello"
      type="email"
      required
    />
    <UICheckbox class="my-2" id="checkboxInput" name="checkboxInput" required>
      <p>This is a checkbox</p>
    </UICheckbox>

    <UIRadio
      class="my-2"
      id="singleUiRadio"
      name="singleUiRadio"
      value="radio value"
      required
    >
      This is a radio
    </UIRadio>
    <UISelect
      id="selectInput"
      name="selectInput"
      label="select fruit"
      validationRules="not:apple"
    >
      <option value="" disabled selected>-- Select fruit --</option>
      <option value="apple">apple</option>
      <option value="banana">banana</option>
    </UISelect>
    <pre>
      <code>
        {{ formProps }}
      </code>
    </pre>
  </UIForm>
</template>

<style scoped></style>
