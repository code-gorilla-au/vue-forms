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
  setup(props, { emit }) {
    const api = useFormApi(props.initFormData);
    provide(KEY_V_FORM_CONTEXT, api);

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
