import { app, auth } from 'firebase';
import { transformRedirectResult } from '@web/lib/firebase/helpers/auth';
import { CurrentUser } from '@web/stores/authStore';
import { User, Unsubscribe } from 'firebase';

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

  public onAuthStateChanged(
    onChange: (user: User | null) => void
  ): Unsubscribe {
    return this.firebaseAuth.onAuthStateChanged((user: User | null): void => {
      onChange(user);
    });
  }

  public async signOut(): Promise<void> {
    return await this.firebaseAuth.signOut();
  }
}

export { FirebaseAuth };
