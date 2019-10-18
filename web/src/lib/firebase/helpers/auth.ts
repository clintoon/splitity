import { auth } from 'firebase';
import { CurrentUser } from '@web/stores/authStore';
import { User } from 'firebase';

const transformRedirectResult = (
  result: auth.UserCredential
): CurrentUser | null => {
  if (!result.user) {
    return null;
  }

  return {
    email: result.user.email as string,
    emailVerified: result.user.emailVerified as boolean,
    userId: result.user.uid as string,
  };
};

interface TransformFirebaseUser {
  user: User;
}

const transformFirebaseUser = ({
  user,
}: TransformFirebaseUser): CurrentUser => {
  return {
    email: user.email as string,
    emailVerified: user.emailVerified as boolean,
    userId: user.uid as string,
  };
};

export { transformRedirectResult, transformFirebaseUser };
