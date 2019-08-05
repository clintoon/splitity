import React from 'react';
import { storiesOf } from '@storybook/react';
import { Hero } from '@web/design/components/Hero/Hero';
import { select, text } from '@storybook/addon-knobs';
import { Color } from '@web/design/styles/color';
import { noop } from 'lodash';

storiesOf('Hero', module)
  .add(
    'Documentation',
    (): JSX.Element => (
      <Hero
        title={text('title', 'hero title')}
        subtitle={text('subtitle', 'hero subtitle')}
        backgroundColor={select(
          'backgroundColor',
          Object.values(Color),
          Color.LightOrange
        )}
      />
    )
  )
  .add(
    'with button',
    (): JSX.Element => (
      <Hero
        title={text('title', 'hero title')}
        subtitle={text('subtitle', 'hero subtitle')}
        backgroundColor={select(
          'backgroundColor',
          Object.values(Color),
          Color.LightOrange
        )}
        button={{
          label: text('buttonLabel', 'button label'),
          onClick: noop,
        }}
      />
    )
  );
