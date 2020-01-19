import React from 'react';
import { InfoGrid } from '@web/design/components/InfoGrid/InfoGrid';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import { Color } from '@web/design/styles/color';

storiesOf('InfoGrid', module).add(
  'Documentation',
  (): JSX.Element => (
    <InfoGrid
      title={text('title', 'title')}
      color={select('color', Object.values(Color), Color.Gray50)}
      items={[
        {
          head: 'head 1',
          content: 'This is some good content',
        },
        {
          head: 'head 2',
          content: 'This is also some good content',
        },
        {
          head: 'head 3',
          content: 'This is also some good content',
        },
      ]}
    />
  )
);
