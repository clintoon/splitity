import { omit } from 'lodash';
import { AuthModel } from '@web/stores/authStore';

const mockCurrentUser = {
  email: 'clintonfeng@gmail.com',
  oauthToken: 'oAuthToken',
  emailVerified: false,
  userId: 'abc123',
};

describe('authStore', (): void => {
  describe('views', (): void => {
    describe('isLoggedIn', (): void => {
      it('returns true when logged in', (): void => {
        const authStore = AuthModel.create({ currentUser: undefined });
        expect(authStore.isLoggedIn()).toBe(false);
      });

      it('returns false when not logged in', (): void => {
        const authStore = AuthModel.create({ currentUser: mockCurrentUser });
        expect(authStore.isLoggedIn()).toBe(true);
      });
    });
  });

  describe('actions', (): void => {
    describe('signInUser', (): void => {
      it('correctly sets currentUser state', (): void => {
        const authStore = AuthModel.create({ currentUser: undefined });
        authStore.signInUser(mockCurrentUser);
        expect(authStore.getCurrentUser()).toEqual(mockCurrentUser);
      });
    });

    describe('signOutUser', (): void => {
      it('sets currentUser state to null', (): void => {
        const authStore = AuthModel.create({ currentUser: mockCurrentUser });
        authStore.signOutUser();
        expect(authStore.getCurrentUser()).toEqual(null);
      });
    });

    describe('updateUser', (): void => {
      it('correctly updates currentUser state', (): void => {
        const updatedEmailVerified = true;
        const updatedOauthToken = 'newAuthToken';

        const authStore = AuthModel.create({ currentUser: mockCurrentUser });
        authStore.updateUser({
          emailVerified: updatedEmailVerified,
          oauthToken: updatedOauthToken,
        });
        const expectedUser = {
          ...omit(mockCurrentUser, ['emailVerified', 'oauthToken']),
          emailVerified: updatedEmailVerified,
          oauthToken: updatedOauthToken,
        };
        expect(authStore.getCurrentUser()).toEqual(expectedUser);
      });
    });
  });
});
