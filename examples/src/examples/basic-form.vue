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
  <div class="">
    <VForm
      v-slot="{ formData, validations, formValid }"
      class="test-form"
      @submit="handleSubmit"
    >
      <label for="firstNameId" class="flex flex-col">
        First name
        <VInput
          #default="{ validationMessage }"
          id="firstNameId"
          class="text-black"
          name="firstName"
          required
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
  </div>
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
