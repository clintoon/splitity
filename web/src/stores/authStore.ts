/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { types } from 'mobx-state-tree';

export interface CurrentUser {
  userId: number;
}

const CurrentUserModel = types.model({
  userId: types.number,
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
  }));

type AuthModelType = typeof AuthModel.Type;

export { AuthModel, AuthModelType };
