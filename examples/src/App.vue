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
    <nav class="w-full my-6 flex justify-center">
      <router-link class="px-4" to="/"> home</router-link>
      |
      <router-link class="px-4" to="/dynamic"> dynamic</router-link>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped></style>
