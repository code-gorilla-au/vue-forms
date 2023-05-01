<script lang="ts">
import { defineComponent } from 'vue';
import { UIInput, UICheckbox, UIForm } from '@code-gorilla-au/vue-forms-ui';

export default defineComponent({
  name: 'BasicForm',
  components: { UIInput, UICheckbox, UIForm },
  setup() {
    return {};
  },
});
</script>

<template>
  <UIForm #default="ddd">
    <UIInput
      class="my-3"
      id="singleinput"
      name="singleInput"
      label="hello"
      type="email"
      required
    />
    <UICheckbox class="my-3" id="checkboxInput" name="checkboxInput" required>
      <p>hello</p>
    </UICheckbox>
    <pre>
      <code>
        {{ ddd }}
      </code>
    </pre>
  </UIForm>
</template>

<style scoped></style>
