<script lang="ts">
import { defineComponent } from 'vue';
import { VForm, VInput } from '@vue-forms/vue-forms/src/index';

interface userForm {
  firstName: string;
}

export default defineComponent({
  name: 'App',
  components: { VForm, VInput },
  setup() {
    async function handleSubmit(formData: userForm) {
      console.log('foo', formData);
    }

    return {
      handleSubmit,
    };
  },
});
</script>

<template>
  <div class="h-full w-full flex flex-col items-center max-w-screen-lg mx-auto">
    <h1>Hello</h1>
    <VForm
      v-slot="{ formData, validations, formValid }"
      class="test-form"
      @submit="handleSubmit"
    >
      <code>
        form:
        {{ formData }}
      </code>
      <code>
        validations:
        {{ validations }}
      </code>
      <code>
        formValid:
        {{ formValid }}
      </code>
      <label for="firstNameId" class="flex flex-col">
        First name
        <VInput
          #default="{ validationMessage }"
          id="firstNameId"
          class="text-black"
          name="firstName"
        >
          <p class="text-xs">{{ validationMessage }}</p>
        </VInput>
      </label>
      <label for="lastNameId" class="flex flex-col">
        Last name
        <VInput
          #default="{ validationMessage }"
          id="lastNameId"
          class="text-black"
          name="lastName"
        >
          <p class="text-xs">{{ validationMessage }}</p>
        </VInput>
      </label>
      <button
        :disabled="!formValid"
        class="rounded-lg bg-green-400 disabled:bg-slate-500 text-black font-bold p-3"
      >
        submit form
      </button>
    </VForm>
  </div>
</template>

<style scoped>
.test-form {
  display: flex;
  flex-direction: column;
  width: 400px;
}
code {
  background-color: black;
  display: block;
  padding: 1rem;
  margin: 1rem 0rem;
}
</style>
