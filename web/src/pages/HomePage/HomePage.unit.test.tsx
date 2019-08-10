import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from '@web/pages/HomePage/HomePage';
import { Hero } from '@web/design/components/Hero/Hero';

describe('<HomePage />', (): void => {
  let wrapper: ShallowWrapper;

  beforeEach((): void => {
    wrapper = shallow(<HomePage />);
  });

  it('renders <Hero />', (): void => {
    expect(wrapper.find(Hero).exists()).toBe(true);
  });
});
