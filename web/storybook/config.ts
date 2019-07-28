import { configure } from '@storybook/react';

const loadStories = (): void => {
  const req = require.context('../src', true, /\.stories\.tsx$/);
  req.keys().forEach((filename): void => req(filename));
};

configure(loadStories, module);
