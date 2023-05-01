import { defineComponent, PropType, h, computed, ref } from 'vue';
import { InputStyling } from '../lib/types';
import { VInput } from '@code-gorilla-au/vue-forms';

export default defineComponent({
  name: 'UIRadio',
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
    value: {
      type: String,
      required: true,
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

    const validationMessage = ref('');

    function updateValidationMessage(msg: string) {
      validationMessage.value = msg;
    }

    const validationSlot = computed(() => {
      if (validationMessage.value === '') {
        return;
      }
      return h('p', {
        innerText: validationMessage.value,
        class: ['ui-radio-validation', props?.styling?.validation],
      });
    });

    return () => {
      return h(
        'label',
        {
          class: ['ui-radio-container', ctx.attrs.class],
          for: props.id,
        },
        [
          h(
            'div',
            {
              class: ['ui-radio-inner-container', props?.styling?.container],
            },
            [
              h(
                VInput,
                {
                  ...ctx.attrs,
                  id: props.id,
                  class: ['ui-radio-input', props?.styling?.input],
                  type: 'radio',
                  name: props.name,
                  modelValue: props.modelValue,
                  value: props.value,
                  'onUpdate:validationMessage': updateValidationMessage,
                },
                {
                  default() {
                    return [
                      h('span', { class: 'ui-radio-button' }),
                      defaultSlot.value,
                    ];
                  },
                },
              ),
            ],
          ),
          validationSlot.value,
        ],
      );
    };
  },
});
