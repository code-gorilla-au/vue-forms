<script lang="ts">
import { defineComponent } from 'vue';
import { VForm, VInput } from '@vue-forms/vue-forms/src/index';

export default defineComponent({
  name: 'App',
  components: { VForm, VInput },
});
</script>

<template>
  <div>
    <h1>Hello</h1>
    <VForm v-slot="{ ctx }">
      <p>context {{ ctx }}</p>
      <label>
        input
        <VInput name="gobbie" />
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
