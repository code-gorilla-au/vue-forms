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
  setup(props, { emit }) {
    const api = createFormContext(props.initFormData);

    return () => {
      return h('form', {
        onSubmitStopPrevent() {
          emit('submit', { ...api.data });
        },
        default: () => {
          return {
            formData: api.data,
            validations: api.validations,
            formValid: api.formValid,
          };
        },
      });
    };
  },
});
