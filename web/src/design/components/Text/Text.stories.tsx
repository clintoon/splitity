import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Text,
  TextStyle,
  TextAs,
  TextWeight,
} from '@web/design/components/Text/Text';
import { select, text } from '@storybook/addon-knobs';

storiesOf('Text', module).add(
  'Documentation',
  (): JSX.Element => (
    <Text
      styleOf={select('styleOf', Object.values(TextStyle), TextStyle.Body)}
      as={select('as', Object.values(TextAs), TextAs.Div)}
      fontWeight={select(
        'fontWeight',
        Object.values(TextWeight),
        TextWeight.Normal
      )}
    >
      {text('children', 'example')}
    </Text>
  )
);
