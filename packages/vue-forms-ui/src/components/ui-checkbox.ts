import { defineComponent, PropType, h, computed } from 'vue';
import { InputStyling } from '../lib/types';
import { VInput } from '@code-gorilla-au/vue-forms';

export default defineComponent({
  name: 'UICheckbox',
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
     * provide optional class styling
     */
    styling: {
      type: Object as PropType<InputStyling>,
      required: false,
      default: () => ({}),
    },
  },
  components: { VInput },
  setup(props, ctx) {
    const defaultSlot = computed(() => {
      return ctx.slots.default && ctx.slots.default();
    });

    return () => {
      return h(
        'label',
        {
          class: ['ui-checkbox-container', props?.styling?.container],
          for: props.id,
        },
        [
          h(
            VInput,
            {
              ...ctx.attrs,
              id: props.id,
              class: ['ui-checkbox-input', props?.styling?.input],
              type: 'checkbox',
              name: props.name,
              modelValue: props.modelValue,
            },
            {
              default({ validationMessage }: { validationMessage: string }) {
                return [
                  h('span', { class: 'ui-checkbox-box' }),
                  h('p', {
                    innerText: validationMessage,
                    class: [
                      'ui-checkbox-validation',
                      props?.styling?.validation,
                    ],
                  }),
                ];
              },
            },
          ),
          defaultSlot.value,
        ],
      );
    };
  },
});
