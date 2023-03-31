<script lang="ts">
import { defineComponent } from 'vue';

interface userForm {
  firstName: string;
}

export default defineComponent({
  name: 'App',
  components: {},
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
    <div>
      <nav>
        <router-link to="/"> home</router-link>
        <router-link to="/dynamic"> dynamic</router-link>
      </nav>
    </div>
    <RouterView />
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
