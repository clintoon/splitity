import { app, auth } from 'firebase';

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

  public async getRedirectResult(): Promise<auth.UserCredential> {
    return this.firebaseAuth.getRedirectResult();
  }
}

export { FirebaseAuth };
