import { auth } from 'firebase';

export interface CurrentUser {
  email: string;
  oauthToken: string;
  emailVerified: boolean;
  providerId: string;
  userId: string;
}

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
    oauthToken: credentials.oauthAccessToken,
    email: result.user.email as string,
    emailVerified: result.user.emailVerified as boolean,
    providerId: credentials.providerId,
    userId: result.user.uid as string,
  };
};

export { transformRedirectResult };
