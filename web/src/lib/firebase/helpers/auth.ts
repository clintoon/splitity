import { auth } from 'firebase';
import { CurrentUser } from '@web/stores/authStore';
import { User } from 'firebase';

interface AuthCredentialJSON {
  oauthAccessToken: string;
  providerId: string;
}

const transformRedirectResult = (
  result: auth.UserCredential
): CurrentUser | null => {
  if (!result.user || !result.credential) {
    return null;
  }

  let credentials = result.credential.toJSON() as AuthCredentialJSON;

  return {
    oAuthToken: credentials.oauthAccessToken,
    email: result.user.email as string,
    emailVerified: result.user.emailVerified as boolean,
    userId: result.user.uid as string,
  };
};

interface TransformFirebaseUser {
  oAuthToken: string;
  user: User;
}

const transformFirebaseUser = ({
  oAuthToken,
  user,
}: TransformFirebaseUser): CurrentUser => {
  return {
    oAuthToken,
    email: user.email as string,
    emailVerified: user.emailVerified as boolean,
    userId: user.uid as string,
  };
};

export { transformRedirectResult, transformFirebaseUser };
