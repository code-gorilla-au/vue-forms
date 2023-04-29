import { PropType, defineComponent, h } from 'vue';
import { InputStyling } from '../lib/types';
import { VInput } from '@code-gorilla-au/vue-forms';

export default defineComponent({
  name: 'UIInput',
  components: { VInput },
  inheritAttrs: false,
  emits: {
    /**
     * update model value
     */
    'update:modelValue': null,
    /**
     * input validation message
     */
    'update:validationMessage': null,
  },
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
     */
    type: {
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
    /**
     * provide optional class styling
     */
    styling: {
      type: Object as PropType<InputStyling>,
      required: false,
      default: () => ({}),
    },
  },
  setup(props, ctx) {
    return () => {
      return h(
        'label',
        {
          class: ['ui-input-container', props?.styling?.container],
          for: props.id,
        },
        [
          h('span', {
            innerHTML: props.label,
            class: ['ui-input-label', props?.styling?.label],
          }),
          h(
            VInput,
            {
              ...ctx.attrs,
              class: ['ui-input', props?.styling?.input],
              type: props.type,
              name: props.name,
              modelValue: props.modelValue,
              value: props.value,
            },
            {
              default({ validationMessage }: { validationMessage: string }) {
                return h('p', {
                  innerText: validationMessage,
                  class: ['ui-input-validation', props?.styling?.validation],
                });
              },
            },
          ),
        ],
      );
    };
  },
});
