import { defineComponent, h } from 'vue';
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
    /**
     * type of input
     */ type: {
      type: String,
      required: false,
      default: 'text',
    },
    /**
     * name of the input
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * model value
     */
    modelValue: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * value used for input type 'radio'
     */
    value: {
      type: String,
      required: false,
    },
  },
  setup(props, ctx) {
    return () => {
      return h('label', { for: props.id }, [
        h('span', { innerHTML: props.label }),
        h(VInput, {
          type: props.type,
          name: props.name,
          modelValue: props.modelValue,
          value: props.value,
          ...ctx.attrs,
        }),
      ]);
    };
  },
});
