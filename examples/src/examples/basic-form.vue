<script lang="ts">
import { defineComponent } from 'vue';
import { VForm, VInput } from '@vue-forms/vue-forms/src/index';

interface userForm {
  firstName: string;
}

export default defineComponent({
  name: 'BasicForm',
  components: { VForm, VInput },
  emits: {
    /**
     * form data
     */
    formData: null,
  },
  setup(_, { emit }) {
    async function handleSubmit(formData: userForm) {
      emit('formData', formData);
    }

    function formatCodeBlock(obj: object) {
      return JSON.stringify(obj, null, 2);
    }

    return {
      handleSubmit,
      formatCodeBlock,
    };
  },
});
</script>

<template>
  <VForm
    v-slot="{ formData, validations, formValid }"
    class="test-form"
    @submit="handleSubmit"
  >
    <label for="firstNameId" class="flex flex-col mb-2">
      First name
      <VInput
        #default="{ validationMessage }"
        id="firstNameId"
        class="text-black"
        name="firstName"
        placeholder="required"
        required
      >
        <p class="text-xs">{{ validationMessage }}</p>
      </VInput>
    </label>
    <label for="lastNameId" class="flex flex-col mb-2">
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
    <label for="emailId" class="flex flex-col mb-2">
      Email
      <VInput
        #default="{ validationMessage }"
        id="emailId"
        class="text-black"
        name="email"
        type="email"
        placeholder="required"
        required
      >
        <p class="text-xs">{{ validationMessage }}</p>
      </VInput>
    </label>
    <label for="checkboxId" class="relative mb-2">
      <div class="flex items-center">
        <VInput
          #default="{ validationMessage }"
          id="checkboxId"
          class="text-black"
          name="checkbox"
          type="checkbox"
          required
        >
          <span class="absolute mt-8 text-xs">{{ validationMessage }}</span>
        </VInput>
        <p class="ml-4 text-sm">Working with checkbox</p>
      </div>
    </label>
    <label>
      radio
      <VInput
        #default="{ validationMessage }"
        type="radio"
        id="radioId"
        name="radio"
        modelValue="this is a radio"
        class="text-black"
      >
        <span class="absolute mt-8 text-xs">{{ validationMessage }}</span>
      </VInput>
    </label>
    <button
      type="submit"
      :disabled="!formValid"
      class="rounded-lg bg-green-400 disabled:bg-slate-400 text-black font-bold p-3 my-4"
    >
      submit form
    </button>
    <pre>
        <code>
          {{ formatCodeBlock({formData, validations, formValid}) }}
        </code>
      </pre>
  </VForm>
</template>

<style scoped>
.test-form {
  display: flex;
  flex-direction: column;
  width: 500px;
}
pre {
  background-color: black;
  margin: 1rem 0rem;
}
p > code,
li > code,
dd > code,
td > code {
  background: #ffeff0;
}
</style>