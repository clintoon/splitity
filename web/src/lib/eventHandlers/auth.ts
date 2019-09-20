import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';

const handleSignIn = async (): Promise<void> => {
  const auth = new FirebaseAuth(firebaseApp);
  auth.redirectSignInWithGithub();
};

export { handleSignIn };
