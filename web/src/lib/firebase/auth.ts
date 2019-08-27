import { app, auth } from 'firebase';
import { transformRedirectResult } from '@web/lib/firebase/helpers/auth';
import { CurrentUser } from '@web/stores/authStore';

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
}

export { FirebaseAuth };
