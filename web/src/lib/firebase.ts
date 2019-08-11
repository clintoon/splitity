import { firebaseConfig } from '@web/config/firebase';
import * as firebaseApp from 'firebase/app';
import 'firebase/auth';

const firebase = firebaseApp.initializeApp(firebaseConfig);

export { firebase };
