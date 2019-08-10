import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { PageContent } from '@web/components/PageContent';
import { BrowserRouter, Route } from 'react-router-dom';
import { Navbar } from '@web/components/Navbar';
import { HomePage } from '@web/pages/HomePage/HomePage';

describe('<PageContent />', (): void => {
  let wrapper: ShallowWrapper;

  beforeEach((): void => {
    wrapper = shallow(<PageContent />);
  });

  it('renders <BrowserRouter />', (): void => {
    expect(wrapper.find(BrowserRouter).exists()).toBe(true);
  });

  it('renders <Navbar /> as a child of <BrowserRouter />', (): void => {
    expect(
      wrapper
        .find(BrowserRouter)
        .find(Navbar)
        .exists()
    ).toBe(true);
  });

  describe('routes', (): void => {
    let routesWrapper: ShallowWrapper;

    beforeEach((): void => {
      routesWrapper = wrapper.find(BrowserRouter).find(Route);
    });

    it('renders the <HomePage/> at path "/"', (): void => {
      const routeWrapper = routesWrapper.find({ path: '/' });
      expect(routeWrapper.prop('component')).toBe(HomePage);
      expect(routeWrapper.prop('exact')).toBe(true);
    });
  });
});
