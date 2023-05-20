import { VForm } from '@code-gorilla-au/vue-forms';
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'UIForm',
  components: { VForm },
  setup(props, { slots }) {
    return () => {
      return h(VForm, props, slots);
    };
  },
});
