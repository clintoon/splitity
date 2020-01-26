import { auth } from 'firebase';
import { CurrentUser } from '@web/lib/firebase/auth';
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
    userId: Number((result.user.providerData[0] as ProviderData).uid),
  };
};

interface TransformFirebaseUser {
  user: User;
}

interface ProviderData {
  uid: string;
}

const transformFirebaseUser = ({
  user,
}: TransformFirebaseUser): CurrentUser => {
  return {
    email: user.email as string,
    emailVerified: user.emailVerified as boolean,
    userId: Number((user.providerData[0] as ProviderData).uid),
  };
};

export { transformRedirectResult, transformFirebaseUser };
