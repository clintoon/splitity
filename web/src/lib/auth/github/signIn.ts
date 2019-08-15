import { auth } from 'firebase';
import { firebaseApp } from '@web/lib/firebase';

const provider = new auth.GithubAuthProvider();
provider.addScope('user:email');

const signIn = (): void => {
  firebaseApp.auth().signInWithRedirect(provider);
};

export { signIn };
