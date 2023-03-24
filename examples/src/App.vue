<script lang="ts">
import { defineComponent } from 'vue';
import VForm from '@vue-forms/vue-forms/src/components/v-form.vue';

export default defineComponent({
  name: 'App',
  components: {VForm},
});
</script>

<template>
  <div>
    <h1>Hello</h1>
    <VForm v-slot="{ctx}">
      <p>context {{ ctx }}</p>
      <label>
        input
        <input v-model="ctx">
      </label>
    </VForm>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
