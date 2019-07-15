import * as firebaseApp from 'firebase/app';
import 'firebase/auth';

const firebase = firebaseApp.initializeApp({});

export { firebase };
