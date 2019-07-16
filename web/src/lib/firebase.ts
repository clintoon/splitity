import { env } from '@web/config/env';
import * as firebaseApp from 'firebase/app';
import 'firebase/auth';

const firebase = firebaseApp.initializeApp(env.firebaseConfig);

export { firebase };
