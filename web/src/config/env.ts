import * as log from 'loglevel';

export interface Env {
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

const config = {
  dev: {
    firebaseConfig: {
      apiKey: 'AIzaSyCg1Oqq7zDgg-AjYHiKnmJ7teAHMTZnTrY',
      authDomain: 'split-my-prs-dev.firebaseapp.com',
      databaseURL: 'https://split-my-prs-dev.firebaseio.com',
      projectId: 'split-my-prs-dev',
      storageBucket: 'split-my-prs-dev.appspot.com',
      messagingSenderId: '283161176367',
      appId: '1:283161176367:web:ab88ba6d8bb3ef41',
    },
  },
  stage: {
    // TODO: Update to new env
    firebaseConfig: {
      apiKey: 'AIzaSyCg1Oqq7zDgg-AjYHiKnmJ7teAHMTZnTrY',
      authDomain: 'split-my-prs-dev.firebaseapp.com',
      databaseURL: 'https://split-my-prs-dev.firebaseio.com',
      projectId: 'split-my-prs-dev',
      storageBucket: 'split-my-prs-dev.appspot.com',
      messagingSenderId: '283161176367',
      appId: '1:283161176367:web:ab88ba6d8bb3ef41',
    },
  },
  prod: {
    // TODO: Update to new env
    firebaseConfig: {
      apiKey: 'AIzaSyCg1Oqq7zDgg-AjYHiKnmJ7teAHMTZnTrY',
      authDomain: 'split-my-prs-dev.firebaseapp.com',
      databaseURL: 'https://split-my-prs-dev.firebaseio.com',
      projectId: 'split-my-prs-dev',
      storageBucket: 'split-my-prs-dev.appspot.com',
      messagingSenderId: '283161176367',
      appId: '1:283161176367:web:ab88ba6d8bb3ef41',
    },
  },
};

let env: Env;

if (
  process.env.NODE_ENV !== undefined &&
  (process.env.NODE_ENV === 'dev' ||
    process.env.NODE_ENV === 'stage' ||
    process.env.NODE_ENV === 'prod')
) {
  env = config[process.env.NODE_ENV];
} else {
  log.error('Invalid process.env.NODE_ENV');
}

export { env };
