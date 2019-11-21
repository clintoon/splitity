import { app, auth } from 'firebase';
import { transformRedirectResult } from '@web/lib/firebase/helpers/auth';
import { User, Unsubscribe } from 'firebase';

export interface CurrentUser {
  email: string;
  emailVerified: boolean;
  userId: string;
}

interface RedirectResult {
  currentUser: CurrentUser;
  oAuthToken: string;
}

interface AuthCredentialJSON {
  oauthAccessToken: string;
  providerId: string;
}

class FirebaseAuth {
  private firebaseAuth: auth.Auth;

  public constructor(firebaseApp: app.App) {
    this.firebaseAuth = firebaseApp.auth();
  }

  public async redirectSignInWithGithub(): Promise<void> {
    const provider = new auth.GithubAuthProvider();
    provider.addScope('user:email');
    return this.firebaseAuth.signInWithRedirect(provider);
  }

  public async getRedirectResult(): Promise<RedirectResult | null> {
    const result = await this.firebaseAuth.getRedirectResult();

    const currentUser = transformRedirectResult(result);

    if (!result.credential || !currentUser) {
      // This occurs when you reload the page when you are already logged in
      // as firebaseAuth.getRedirectResult() returns user as null.
      // firebase.onAuthStateChanged handles this case.
      return null;
    }

    const oAuthToken = (result.credential.toJSON() as AuthCredentialJSON)
      .oauthAccessToken;

    return { currentUser, oAuthToken };
  }

  public onAuthStateChanged(
    onChange: (user: User | null) => void
  ): Unsubscribe {
    return this.firebaseAuth.onAuthStateChanged(
      (user: User | null): Promise<void> => {
        return new Promise((resolve): void => {
          onChange(user);
          resolve();
        });
      }
    );
  }

  public async signOut(): Promise<void> {
    return await this.firebaseAuth.signOut();
  }
}

export { FirebaseAuth };
