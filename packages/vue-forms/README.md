# vue-forms

Supercharged unstyled forms with built in validation, submission and error handling.
Vue-forms was designed to be easily integrable with tailwind or css framework of your choice.

<br>

---

## Usage

---

<br>
<br>

### Basic

---

Basic example of importing the form and input with tailwind styling.

Note that it's not required to use v-model within the inputs, `formData` prop will dynamically generate form data based on the input `name` or `id`.

Validations are evaluated within the input and reported to the form, the form provides slot props (`formValid`, `validations`) which shows realtime form validations.

<br>

<details>
  <summary> Basic example</summary>

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
        name="firstName"
        type="text"
        class="text-black"
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

</details>

<br>
<br>

### Using v-model

---

Vue forms can be used with `v-model` syntax and the form will still evaluate if the form is valid for submit.

<br>

<details>
  <summary> v-model example</summary>

```html
<script lang="ts">
  import { reactive } from 'vue';
  import { VForm, VInput } from '@code-gorilla-au/vue-forms';
  const form = reactive({
    firstName: '',
  });
  /**
   * ...
   */
</script>

<template>
  <VForm v-slot="{ validations, formValid }" @submit="handleSubmit">
    <label for="firstNameId" class="flex flex-col mb-2">
      First name
      <VInput
        #default="{ validationMessage }"
        v-model="form.firstName"
        id="firstNameId"
        name="firstName"
        type="text"
        class="text-black"
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

</details>

<br>
<br>

---

## Validations

---

<br>

Vue form uses native input validation along side some additional default rules.
The optional prop `validationRules` can be used to describe the additional rules to run against the input. Few things to note below:

- Composing multiple rules can be 'piped' `|` after each rule.

- Some rules require arguments to be provided, which can be added after a colon `:`
  - Multiple arguments are comma `,` delimited.

<details>
  <summary> rules example</summary>

- Input has a valid email address

  ```html
  <VInput validationRules="email" type="text"> </VInput>
  ```

- Input does not contain the following values

  ```html
  <VInput validationRules="not:foo,bar" type="text"> </VInput>
  ```

- Input is a valid email address and starts with a specific value

  ```html
  <VInput validationRules="email|prefix:hello" type="text"> </VInput>
  ```

</details>

<br>
<br>

### Rules

| Rule     | Description                                   | Example           |
| -------- | --------------------------------------------- | ----------------- |
| email    | Input value is a valid email                  | "email"           |
| not      | Input value does not contain a specific value | "not:hello,world" |
| contains | Input value contains a specific value         | "not:hello,world" |
| is       | Input value equals a specific value           | "is:hello,world"  |
| prefix   | Input value has a prefix                      | "prefix:hello"    |
| suffix   | Input value has a suffix                      | "suffix:world"    |

<br>
<br>

---

## Examples

---

<br>

Form detailed examples can be seen in `examples/src/examples`
