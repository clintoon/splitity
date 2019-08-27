import { types, ModelActions } from 'mobx-state-tree';
import produce from 'immer';

export interface CurrentUser {
  email: string;
  oauthToken: string;
  emailVerified: boolean;
  userId: string;
}

const CurrentUserModel = types.model({
  email: types.string,
  oauthToken: types.string,
  emailVerified: types.boolean,
  userId: types.string,
});

const AuthModel = types
  .model({
    currentUser: types.maybeNull(CurrentUserModel),
  })
  .views(
    (self): ModelActions => ({
      isLoggedIn: (): boolean => {
        return !!self.currentUser;
      },
    })
  )
  .actions(
    (self): ModelActions => ({
      signInUser: (user: CurrentUser): void => {
        self.currentUser = user;
      },
      signOutUser: (): void => {
        self.currentUser = null;
      },
      updateUser: (user: Partial<CurrentUser>): void => {
        if (self.currentUser === undefined) {
          return;
        }

        const newUser = produce(
          self.currentUser,
          (draft: CurrentUser): void => {
            Object.assign(draft, user);
          }
        );
        self.currentUser = newUser;
      },
    })
  );

type AuthModelType = typeof AuthModel.Type;

export { AuthModel, AuthModelType };
