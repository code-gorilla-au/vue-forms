import { Fragment, defineComponent, h } from 'vue';

export default defineComponent({
  name: 'VList',
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots, expose }) {
    expose({ namespace: props.namespace });
    return () => {
      return h(Fragment, slots.default && slots.default());
    };
  },
});
