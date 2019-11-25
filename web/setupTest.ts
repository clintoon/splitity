import '@testing-library/jest-dom/extend-expect';
import { PROCESS_ENV_GITHUB_APP_NAME } from '@web/testing/testGlobals';

// Setup globals
process.env = Object.assign(process.env, {
  GITHUB_APP_NAME: PROCESS_ENV_GITHUB_APP_NAME,
});
