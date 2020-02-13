import { omit } from 'lodash';
import { AuthModel } from '@web/stores/authStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';

const GITHUB_INSTALLATION_ID = 123;

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

    describe('updateUser', (): void => {
      const githubInstallationId = 123;

      it('correctly updates currentUser state', (): void => {
        const mockCurrentUser = currentUserFactory();
        const authStore = AuthModel.create({ currentUser: mockCurrentUser });
        authStore.updateUser({
          githubInstallationId,
        });
        const expectedUser = {
          ...omit(mockCurrentUser, ['githubInstallationId']),
          githubInstallationId: githubInstallationId,
        };
        expect(authStore.getCurrentUser()).toEqual(expectedUser);
      });

      it('currentUser is null when called when currentUser is not set', (): void => {
        const authStore = AuthModel.create({ currentUser: null });
        authStore.updateUser({
          githubInstallationId,
        });
        expect(authStore.getCurrentUser()).toBe(null);
      });
    });
  });

  describe('getGithubInstallationId', (): void => {
    it('returns null when user has not installed github app', (): void => {
      const mockCurrentUser = currentUserFactory({
        githubInstallationId: null,
      });
      const authStore = AuthModel.create({ currentUser: mockCurrentUser });
      expect(authStore.getGithubInstallationId()).toBe(null);
    });

    it('returns githubInstallationId when user has installed github app', (): void => {
      const mockCurrentUser = currentUserFactory({
        githubInstallationId: GITHUB_INSTALLATION_ID,
      });

      const authStore = AuthModel.create({ currentUser: mockCurrentUser });
      expect(authStore.getGithubInstallationId()).toBe(GITHUB_INSTALLATION_ID);
    });
  });
});
