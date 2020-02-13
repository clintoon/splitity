/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { types } from 'mobx-state-tree';

export interface CurrentUser {
  userId: number;
  githubInstallationId: number | null;
}

const CurrentUserModel = types.model({
  userId: types.number,
  githubInstallationId: types.maybeNull(types.number),
});

const AuthModel = types
  .model({
    currentUser: types.maybeNull(CurrentUserModel),
  })
  .views(self => ({
    isLoggedIn: (): boolean => {
      return !!self.currentUser;
    },
    getCurrentUser: (): CurrentUser | null => {
      return self.currentUser;
    },
    getGithubInstallationId: (): number | null => {
      return self.currentUser && self.currentUser.githubInstallationId;
    },
  }))
  .actions(self => ({
    signInUser: (user: CurrentUser): void => {
      self.currentUser = user;
    },
    signOutUser: (): void => {
      self.currentUser = null;
    },
    updateUser: (user: Partial<CurrentUser>): void => {
      if (!self.currentUser) {
        return;
      }
      const newUser = { ...self.currentUser };
      Object.assign(newUser, user);

      self.currentUser = newUser;
    },
  }));

type AuthModelType = typeof AuthModel.Type;

export { AuthModel, AuthModelType };
