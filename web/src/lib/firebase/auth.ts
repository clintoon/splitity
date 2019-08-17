import { app, auth } from 'firebase';
import {
  transformRedirectResult,
  CurrentUser,
} from '@web/lib/firebase/helpers/auth';

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

  public async getRedirectResult(): Promise<CurrentUser | null> {
    const result = await this.firebaseAuth.getRedirectResult();
    return transformRedirectResult(result);
  }

  // public async getCurrentUser() {
  //   const result = await this.firebaseAuth.currentUser;
  //   return transformRedirectResult(result);
  // }
}

export { FirebaseAuth };
