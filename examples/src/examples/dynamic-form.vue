<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { VForm, VInput } from '@vue-forms/vue-forms';
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
      radio: '',
      list: [
        {
          id: '1',
          name: 'one',
          value: '1',
        },
        {
          id: '2',
          name: 'two',
          value: '1',
        },
        {
          id: '3',
          name: 'three',
          value: '1',
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
        value: '',
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
      v-slot="{ formData, formValid }"
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
          v-model="item.value"
          required
        >
          <p class="text-xs">{{ validationMessage }}</p>
        </VInput>
      </label>

      <label>
        radio
        <VInput
          #default="{ validationMessage }"
          type="radio"
          id="radioId"
          name="radio"
          value="this is a radio"
          v-model="schema.radio"
          class="text-black"
        >
          <span class="absolute mt-8 text-xs">{{ validationMessage }}</span>
        </VInput>
      </label>

      <button
        @click.prevent="addRow"
        class="w-44 mx-auto rounded-lg my-2 bg-slate-400"
      >
        add row
      </button>

      <button
        type="submit"
        :disabled="!formValid"
        class="rounded-lg bg-green-400 disabled:bg-slate-400 text-black font-bold p-3 my-4"
      >
        submit form
      </button>
      <pre>
        <code>
          {{ formatCodeBlock({schema, formData}) }}
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
