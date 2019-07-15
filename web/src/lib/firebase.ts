import { env } from '@app/config/env'; // TODO FIX VSCODE SETTINGS
import * as firebaseApp from 'firebase/app';
import 'firebase/auth';

const firebase = firebaseApp.initializeApp({});

export { firebase };
