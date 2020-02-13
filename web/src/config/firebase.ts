const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY as string,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN as string,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID as string,
  appId: process.env.REACT_APP_FIREBASE_APP_ID as string,
};

export { firebaseConfig };
