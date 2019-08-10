import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { App } from '@web/components/App';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { PageContent } from '@web/components/PageContent';

describe('<App/>', (): void => {
  let wrapper: ShallowWrapper;

  beforeEach((): void => {
    wrapper = shallow(<App />);
  });

  it('renders GlobalStyle', (): void => {
    expect(wrapper.find(GlobalStyle).exists()).toBe(true);
  });

  it('renders PageContent', (): void => {
    expect(wrapper.find(PageContent).exists()).toBe(true);
  });
});
