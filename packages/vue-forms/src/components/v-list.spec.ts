// @vitest-environment jsdom

import { render } from '@testing-library/vue';
import VList from './v-list';

describe('VList', () => {
  it('adding VList', () => {
    const { html } = render(VList, {
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
