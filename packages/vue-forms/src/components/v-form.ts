/* eslint-disable prettier/prettier */
import { defineComponent, h, PropType, provide } from 'vue';
import { KEY_V_FORM_CONTEXT, useFormApi } from '../use/forms';

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
    const api = useFormApi(props.initFormData);
    provide(KEY_V_FORM_CONTEXT, api);

    console.log('version 2');



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
