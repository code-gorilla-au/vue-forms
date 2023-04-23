<script lang="ts">
import { defineComponent } from 'vue';
import { UIInput } from '@code-gorilla-au/vue-forms-ui';

interface userForm {
  firstName: string;
}

export default defineComponent({
  name: 'BasicForm',
  components: { UIInput },
  emits: {
    /**
     * form data
     */
    formData: null,
  },
  setup(_, { emit }) {
    async function handleSubmit(formData: userForm) {
      console.log('formData', formData);
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
  <div>
    <UIInput id="singleinput" name="singleInput" label="hello" />
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
