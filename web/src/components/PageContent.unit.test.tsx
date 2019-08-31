import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { PageContent } from '@web/components/PageContent';
import { Navbar } from '@web/components/Navbar';

describe('<PageContent />', (): void => {
  let wrapper: ShallowWrapper;

  beforeEach((): void => {
    wrapper = shallow(<PageContent />);
  });

  it('renders <Navbar />', (): void => {
    expect(wrapper.find(Navbar).exists()).toBe(true);
  });
});
