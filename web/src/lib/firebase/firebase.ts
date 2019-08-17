import { firebaseConfig } from '@web/config/firebase';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
