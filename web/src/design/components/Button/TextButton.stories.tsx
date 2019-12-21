import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  TextButton,
  ButtonStyle,
} from '@web/design/components/Button/TextButton';
import { text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ButtonSize } from './internal/BaseButton';

storiesOf('TextButton', module).add(
  'Documentation',
  (): JSX.Element => (
    <TextButton
      onClick={action('onClick')}
      styleOf={select(
        'styleOf',
        Object.values(ButtonStyle),
        ButtonStyle.Primary
      )}
      size={select('size', Object.values(ButtonSize), ButtonSize.Medium)}
    >
      {text('children', 'label')}
    </TextButton>
  )
);
