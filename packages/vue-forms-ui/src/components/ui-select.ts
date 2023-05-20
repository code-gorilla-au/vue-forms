import { defineComponent, h, PropType } from 'vue';
import { InputStyling } from '../lib/types';
import { VSelect } from '@code-gorilla-au/vue-forms';

export default defineComponent({
  name: 'UISelect',
  components: {
    VSelect,
  },
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
     * provide validation rules based on default rules engine.
     */
    validationRules: {
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
          class: [
            'ui-select-container',
            ctx.attrs.class,
            props?.styling?.container,
          ],
          for: props.id,
        },
        [
          h('span', {
            innerHTML: props.label,
            class: ['ui-select-label', props?.styling?.label],
          }),
          h(
            VSelect,
            {
              ...ctx.attrs,
              id: props.id,
              class: ['ui-select', props?.styling?.input],
              name: props.name,
              modelValue: props.modelValue,
              validationRules: props.validationRules,
            },
            {
              default() {
                return ctx.slots.default && ctx.slots.default();
              },
              validation({ validationMessage }: { validationMessage: string }) {
                return h('p', {
                  innerText: validationMessage,
                  class: ['ui-select-validation', props?.styling?.validation],
                });
              },
            },
          ),
        ],
      );
    };
  },
});
