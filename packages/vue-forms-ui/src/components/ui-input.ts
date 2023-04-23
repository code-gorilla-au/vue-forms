import { defineComponent } from 'vue';
import { VInput } from '@code-gorilla-au/vue-forms';

export default defineComponent({
  name: 'UIInput',
  components: { VInput },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
  },
  template: `
  <label :for="id">
    <span v-show="label">{{ label }}</span>
    <VInput :id="id" #default="{ validationMessage }" >
      <p v-show=""></p>
    </VInput>
  </label>`,
});
