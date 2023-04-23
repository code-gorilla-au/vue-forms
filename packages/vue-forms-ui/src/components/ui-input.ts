import { defineComponent } from 'vue';
import { VInput } from '@code-gorilla-au/vue-forms';

export default defineComponent({
  name: 'UIInput',
  components: { VInput },
  inheritAttrs: false,
  props: {
    /**
     * Id for input
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * label for input
     */
    label: {
      type: String,
      required: false,
    },
  },
  template: `
  <label :for="id">
    <span v-show="label">{{ label }}</span>
    <VInput :id="id" v-bind="$attrs" #default="{ validationMessage }" >
      <p v-show="validationMessage">{{ validationMessage }}</p>
    </VInput>
  </label>`,
});
