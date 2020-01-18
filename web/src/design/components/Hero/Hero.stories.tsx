import React from 'react';
import { storiesOf } from '@storybook/react';
import { Hero } from '@web/design/components/Hero/Hero';
import { select, text } from '@storybook/addon-knobs';
import { Color } from '@web/design/styles/color';
import { noop } from 'lodash';
import styled from 'styled-components';

const BodyPlaceholder = styled.div`
  background: ${Color.Gray400};
  border-radius: 30px;
  height: 540px;
  width: 960px;
`;

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
          Color.Blue50
        )}
        body={<BodyPlaceholder />}
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
          Color.Blue50
        )}
        button={{
          label: text('buttonLabel', 'button label'),
          onClick: noop,
        }}
        body={<BodyPlaceholder />}
      />
    )
  );
