import { auth } from 'firebase';
import { firebaseApp } from '@web/lib/firebase';

const provider = new auth.GithubAuthProvider();
provider.addScope('repo');

const signIn = async (): Promise<void> => {
  try {
    const result = await firebaseApp.auth().signInWithRedirect(provider);
    console.log('success: ', result);
  } catch (error) {
    console.log('fail: ', error);
  }
};

export { signIn };
