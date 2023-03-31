<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { VForm, VInput } from '@vue-forms/vue-forms/src/index';
import { v4 as uuid } from 'uuid';

interface userForm {
  firstName: string;
}

export default defineComponent({
  name: 'DynamicForm',
  components: { VForm, VInput },
  emits: {
    /**
     * form data
     */
    formData: null,
  },
  setup(_, { emit }) {
    const schema = reactive({
      list: [
        {
          id: '1',
          name: 'one',
        },
      ],
    });

    async function handleSubmit(formData: userForm) {
      emit('formData', formData);
    }

    function formatCodeBlock(obj: object) {
      return JSON.stringify(obj, null, 2);
    }

    function addRow() {
      schema.list.push({
        id: uuid(),
        name: '',
      });
    }

    return {
      schema,
      handleSubmit,
      formatCodeBlock,
      addRow,
    };
  },
});
</script>

<template>
  <div>
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
      <label
        v-for="item in schema.list"
        :key="item.id"
        class="flex flex-col mb-2"
      >
        {{ item.name }}
        <VInput
          #default="{ validationMessage }"
          :id="item.id"
          class="text-black"
          :name="item.name"
          placeholder="required"
          required
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
    <button
      @click.prevent="addRow"
      class="w-44 mx-auto rounded-lg my-2 bg-slate-400"
    >
      add row
    </button>
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
