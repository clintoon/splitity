import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { Navbar as DesignNavbar } from '@web/design/components/Navbar/Navbar';
import { FirebaseAuth } from '@web/lib/firebase/auth';
import { TestStoreProvider, mockStoreFactory } from '@web/testing/mockStore';
import {
  RoutePath,
  AuthRoutePath,
  GithubRoutePath,
} from '@web/constants/routes';
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

    it('has login button', (): void => {
      const rightItems = wrapper.find(DesignNavbar).props()
        .rightItems as JSX.Element[];

      const logoutButton = shallow(rightItems[0]);

      expect(logoutButton.text()).toBe('Login');
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
          AuthRoutePath.ToSignIn
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
        <MemoryRouter initialEntries={[GithubRoutePath.AppRoot]}>
          <TestStoreProvider stores={signedInStore}>
            <Navbar />
          </TestStoreProvider>
        </MemoryRouter>
      );
    });

    it('renders design <Navbar />', (): void => {
      expect(wrapper.find(DesignNavbar).exists()).toBe(true);
    });

    it('has logout button', (): void => {
      const rightItems = wrapper.find(DesignNavbar).props()
        .rightItems as JSX.Element[];

      const logoutButton = shallow(rightItems[0]);

      expect(logoutButton.text()).toBe('Logout');
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
          RoutePath.Root
        );
      });
    });
  });

  describe('at root route', (): void => {
    beforeEach((): void => {
      const signedInStore = mockStoreFactory({
        auth: { currentUser: currentUserFactory() },
      });

      wrapper = mount(
        <MemoryRouter initialEntries={['/']}>
          <TestStoreProvider stores={signedInStore}>
            <Navbar />
          </TestStoreProvider>
        </MemoryRouter>
      );
    });

    it('displays the unauthenticated navbar at homepage', (): void => {
      const rightItems = wrapper.find(DesignNavbar).props()
        .rightItems as JSX.Element[];

      const loginButton = shallow(rightItems[0]);

      expect(loginButton.text()).toBe('Login');
    });
  });
});
