import { auth } from 'firebase';
import { firebaseApp } from '@web/lib/firebase';

const provider = new auth.GithubAuthProvider();
provider.addScope('user:email');

const signIn = async (): Promise<void> => {
  try {
    const result = await firebaseApp.auth().signInWithRedirect(provider);
    // If here, then we are already logged in.
    console.log('success: ', result);
  } catch (error) {
    console.log('fail: ', error);
  }
};

export { signIn };
