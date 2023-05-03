// @vitest-environment jsdom

import { render } from '@testing-library/vue';
import VList from './v-list';
import VInput from './v-input';
import { defineComponent, h } from 'vue';

const testComponent = defineComponent({
  name: 'testComponent',
  components: { VList, VInput },
  setup() {
    return () => {
      return h('div', null, [
        h(VList, { namespace: 'test' }, [
          h(VInput, { id: '1', name: 'firstName' }),
        ]),
      ]);
    };
  },
});

describe('VList', () => {
  it('adding VList', () => {
    const { html } = render(testComponent, {
      props: {
        namespace: 'list',
      },
      slots: {
        default: 'VInput',
      },
    });
    expect(html()).toEqual('VInput');
  });
});
