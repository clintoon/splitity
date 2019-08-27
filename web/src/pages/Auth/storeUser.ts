import { FirebaseAuth } from '@web/lib/firebase/auth';
import { firebaseApp } from '@web/lib/firebase/firebase';
import { StoreType } from '@web/stores/storeProvider';

const storeUser = async (store: StoreType): Promise<void> => {
  const auth = new FirebaseAuth(firebaseApp);
  const result = await auth.getRedirectResult();
  if (result) {
    store.auth.signInUser(result);
  }
};

export { storeUser };
