import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withActions } from '@storybook/addon-actions';

const loadStories = (): void => {
  const req = require.context('../src', true, /\.stories\.tsx$/);
  req.keys().forEach((filename): void => req(filename));
};

addDecorator(withKnobs);

configure(loadStories, module);
