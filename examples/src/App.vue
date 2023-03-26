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
  <div>
    <h1>Hello</h1>
    <VForm v-slot="{ ctx }" class="test-form" @submit="handleSubmit">
      <p>context {{ ctx }}</p>
      <label>
        input
        <VInput name="firstName" />
      </label>
      <button>submit form</button>
    </VForm>
  </div>
</template>

<style scoped>
.test-form {
  display: flex;
  flex-direction: column;
}
</style>
