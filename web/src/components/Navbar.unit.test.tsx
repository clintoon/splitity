import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { Navbar as DesignNavbar } from '@web/design/components/Navbar/Navbar';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { TestStoreProvider, mockStoreFactory } from '@web/testing/mockStore';
import { RoutePath } from '@web/constants/routes';
import { MemoryRouter } from 'react-router';
import { Navbar, NavbarForTest } from '@web/components/Navbar';
import { currentUserFactory } from '@web/testing/mockCurrentUser';

jest.mock('@web/lib/firebase/auth');

describe('<Navbar />', (): void => {
  let wrapper: ReactWrapper;

  describe('not authenticated', (): void => {
    beforeEach((): void => {
      wrapper = mount(
        <TestStoreProvider stores={mockStoreFactory()}>
          <MemoryRouter initialEntries={['/route']}>
            <Navbar />
          </MemoryRouter>
        </TestStoreProvider>
      );
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
        wrapper.update();
      });

      it('calls auth redirectSignInWithGithub', (): void => {
        expect(
          FirebaseAuth.prototype.redirectSignInWithGithub
        ).toHaveBeenCalled();
      });

      it('redirects to homepage', (): void => {
        expect(wrapper.find(NavbarForTest).prop('location').pathname).toBe(
          RoutePath.AuthToSignInRoute
        );
      });
    });
  });

  describe('authenticated', (): void => {
    beforeEach((): void => {
      const signedInStore = mockStoreFactory({
        auth: { currentUser: currentUserFactory() },
      });

      wrapper = mount(
        <TestStoreProvider stores={signedInStore}>
          <MemoryRouter>
            <Navbar />
          </MemoryRouter>
        </TestStoreProvider>
      );
    });

    it('renders design <Navbar />', (): void => {
      expect(wrapper.find(DesignNavbar).exists()).toBe(true);
    });

    describe('signIn onClick', (): void => {
      beforeEach((): void => {
        const rightItems = wrapper.find(DesignNavbar).props()
          .rightItems as JSX.Element[];

        const logoutButton = shallow(rightItems[0]);
        logoutButton.prop('onClick')();
        wrapper.update();
      });

      it('calls auth signOut', (): void => {
        expect(FirebaseAuth.prototype.signOut).toHaveBeenCalled();
      });

      it('redirects to homepage', (): void => {
        expect(wrapper.find(NavbarForTest).prop('location').pathname).toBe(
          RoutePath.RootRoute
        );
      });
    });
  });
});
