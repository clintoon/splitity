import { omit } from 'lodash';
import { AuthModel } from '@web/stores/authStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';

const mockCurrentUser = currentUserFactory();

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
      const updatedEmailVerified = true;
      const updatedOAuthToken = 'newAuthToken';

      it('correctly updates currentUser state', (): void => {
        const authStore = AuthModel.create({ currentUser: mockCurrentUser });
        authStore.updateUser({
          emailVerified: updatedEmailVerified,
          oAuthToken: updatedOAuthToken,
        });
        const expectedUser = {
          ...omit(mockCurrentUser, ['emailVerified', 'oauthToken']),
          emailVerified: updatedEmailVerified,
          oAuthToken: updatedOAuthToken,
        };
        expect(authStore.getCurrentUser()).toEqual(expectedUser);
      });

      it('currentUser is null when called when currentUser is not set', (): void => {
        const authStore = AuthModel.create({ currentUser: null });
        authStore.updateUser({
          emailVerified: updatedEmailVerified,
          oAuthToken: updatedOAuthToken,
        });
        expect(authStore.getCurrentUser()).toBe(null);
      });
    });
  });
});
