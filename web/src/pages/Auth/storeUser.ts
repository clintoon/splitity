import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';

const storeUser = async (): Promise<void> => {
  const auth = new FirebaseAuth(firebaseApp);
  // TODO try catch potential errors from getRedirectResult
  const result = await auth.getRedirectResult();
  if (result) {
    // TODO store in redux and redirect to dashboard
    console.log('result:', result);
  }
};

export { storeUser };
