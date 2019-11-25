import '@testing-library/jest-dom/extend-expect';
import { GITHUB_APP_NAME } from '@web/testing/testGlobals';

// Setup globals
process.env = Object.assign(process.env, {
  GITHUB_APP_NAME: GITHUB_APP_NAME,
});
