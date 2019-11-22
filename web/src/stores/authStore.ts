/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { types } from 'mobx-state-tree';

export interface CurrentUser {
  email: string;
  emailVerified: boolean;
  userId: string;
  githubInstallationId: number | null;
}

const CurrentUserModel = types.model({
  email: types.string,
  emailVerified: types.boolean,
  userId: types.string,
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
