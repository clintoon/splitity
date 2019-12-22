import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  Button,
  ButtonStyle,
  ButtonSize,
} from '@web/design/components/Button/Button';
import { select, boolean } from '@storybook/addon-knobs';

storiesOf('Button', module).add(
  'Documentation',
  (): JSX.Element => (
    <Button
      styleOf={select(
        'styleOf',
        Object.values(ButtonStyle),
        ButtonStyle.Primary
      )}
      size={select('size', Object.values(ButtonSize), ButtonSize.Medium)}
      disabled={boolean('disabled', false)}
    >
      Hello Button
    </Button>
  )
);
