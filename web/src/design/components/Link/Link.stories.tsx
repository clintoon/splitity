import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import { Link } from './Link';
import { BrowserRouter } from 'react-router-dom';
import { Color } from '@web/design/styles/color';

const colors = Object.values(Color);

storiesOf('Link', module).add(
  'Documentation',
  (): JSX.Element => (
    <BrowserRouter>
      <Link to="/" color={select('color', colors, undefined)}>
        {text('children', 'label')}
      </Link>
    </BrowserRouter>
  )
);
