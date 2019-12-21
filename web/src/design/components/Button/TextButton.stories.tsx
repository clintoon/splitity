import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  TextButton,
  TextButtonStyle,
  TextButtonSize,
} from '@web/design/components/Button/TextButton';
import { text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('TextButton', module).add(
  'Documentation',
  (): JSX.Element => (
    <TextButton
      onClick={action('onClick')}
      styleOf={select(
        'styleOf',
        Object.values(TextButtonStyle),
        TextButtonStyle.Primary
      )}
      size={select(
        'size',
        Object.values(TextButtonSize),
        TextButtonSize.Medium
      )}
    >
      {text('children', 'label')}
    </TextButton>
  )
);
