const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY as string,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN as string,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL as string,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID as string,
  appId: process.env.REACT_APP_FIREBASE_APP_ID as string,
};

export { firebaseConfig };
