# vue-forms

Supercharged unstyled forms with built in validation, submission and error handling.
Vue-forms was designed to be easily integrable with tailwind or css framework of your choice.

<br>

---

## Usage

---

<br>

Basic example of importing the form and input with tailwind styling.

Note that it's not required to use v-model within the inputs, `formData` prop will dynamically generate form data based on the input `name` or `id`.

Validations are evaluated within the input and reported to the form, the form provides slot props (`formValid`, `validations`) which shows realtime form validations.

```html
<script lang="ts">
  import { VForm, VInput } from '@code-gorilla-au/vue-forms';

  /**
   * ...
   */
</script>

<template>
  <VForm v-slot="{ formData, validations, formValid }" @submit="handleSubmit">
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
    <button
      type="submit"
      :disabled="!formValid.value"
      class="rounded-lg bg-green-400 disabled:bg-slate-400 text-black font-bold p-3 my-4"
    >
      submit form
    </button>
  </VForm>
</template>
```

<br>

### Examples

---

<br>

Form detailed examples can be seen in `examples/src/examples`
