import React from 'react';
import { Footer } from '@web/design/components/Footer/Footer';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

storiesOf('Footer', module).add(
  'Documentation',
  (): JSX.Element => <Footer text={text('text', 'Splitity © 2020')} />
);
