import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';

const storeUser = async (): Promise<void> => {
  const auth = new FirebaseAuth(firebaseApp);
  await auth.getRedirectResult();
  // TODO
  // console.log(result.user);
};

export { storeUser };
