/* eslint-disable prettier/prettier */
import { defineComponent, h, PropType } from 'vue';
import { createFormContext } from '../use/forms';

export default defineComponent({
  name: 'VForm',
  emits: {
    /**
     * form submit event
     */
    submit: null,
  },
  props: {
    initFormData: {
      type: Object as PropType<object>,
      required: false,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit, slots }) {
    const api = createFormContext(props.initFormData);

    return () => {
      return h(
        'form',
        {
          onSubmit(event: Event) {
            event.preventDefault();
            event.stopPropagation();
            emit('submit', { ...api.data });
          },
        },
        {
          default: () => {
            return slots.default && slots.default({
              formData: api.data,
              validations: api.validations,
              formValid: api.formValid,
            })
          }
        }
      );
    };
  },
});
