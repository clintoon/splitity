import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { NavbarForTest } from '@web/components/Navbar';
import { Navbar as DesignNavbar } from '@web/design/components/Navbar/Navbar';
import { History, createMemoryHistory } from 'history';
import { FirebaseAuth } from '@web/lib/firebase/auth';

jest.mock('@web/lib/firebase/auth');

describe('<Navbar />', (): void => {
  let wrapper: ShallowWrapper;
  let history: History;

  beforeEach((): void => {
    history = createMemoryHistory();
    wrapper = shallow(<NavbarForTest history={history} />);
  });

  it('renders design <Navbar />', (): void => {
    expect(wrapper.find(DesignNavbar).exists()).toBe(true);
  });

  describe('signIn onClick', (): void => {
    beforeEach((): void => {
      const rightItems = wrapper.find(DesignNavbar).props()
        .rightItems as JSX.Element[];

      const loginButton = shallow(rightItems[0]);
      loginButton.prop('onClick')();
    });

    it('calls auth redirectSignInWithGithub', (): void => {
      expect(
        FirebaseAuth.prototype.redirectSignInWithGithub
      ).toHaveBeenCalled();
    });
  });
});
