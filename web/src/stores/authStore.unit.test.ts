import { AuthModel } from '@web/stores/authStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';

describe('authStore', (): void => {
  describe('views', (): void => {
    describe('isLoggedIn', (): void => {
      it('returns true when logged in', (): void => {
        const authStore = AuthModel.create({ currentUser: undefined });
        expect(authStore.isLoggedIn()).toBe(false);
      });

      it('returns false when not logged in', (): void => {
        const mockCurrentUser = currentUserFactory();
        const authStore = AuthModel.create({ currentUser: mockCurrentUser });
        expect(authStore.isLoggedIn()).toBe(true);
      });
    });
  });

  describe('actions', (): void => {
    describe('signInUser', (): void => {
      it('correctly sets currentUser state', (): void => {
        const mockCurrentUser = currentUserFactory();
        const authStore = AuthModel.create({ currentUser: undefined });
        authStore.signInUser(mockCurrentUser);
        expect(authStore.getCurrentUser()).toEqual(mockCurrentUser);
      });
    });

    describe('signOutUser', (): void => {
      it('sets currentUser state to null', (): void => {
        const mockCurrentUser = currentUserFactory();
        const authStore = AuthModel.create({ currentUser: mockCurrentUser });
        authStore.signOutUser();
        expect(authStore.getCurrentUser()).toEqual(null);
      });
    });
  });
});
