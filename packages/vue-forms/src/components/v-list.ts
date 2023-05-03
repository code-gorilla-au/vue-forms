import { Fragment, defineComponent, h } from 'vue';
import { createListContext } from '../use/lists';

export default defineComponent({
  name: 'VList',
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    createListContext({ namespace: props.namespace });

    return () => {
      return h(Fragment, slots.default && slots.default());
    };
  },
});
