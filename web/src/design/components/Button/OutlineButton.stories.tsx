import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  OutlineButton,
  OutlineButtonStyle,
  OutlineButtonSize,
} from '@web/design/components/Button/OutlineButton';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('OutlineButton', module).add(
  'Documentation',
  (): JSX.Element => (
    <OutlineButton
      onClick={action('onClick')}
      styleOf={select(
        'styleOf',
        Object.values(OutlineButtonStyle),
        OutlineButtonStyle.Primary
      )}
      size={select(
        'size',
        Object.values(OutlineButtonSize),
        OutlineButtonSize.Medium
      )}
      disabled={boolean('disabled', false)}
    >
      {text('children', 'label')}
    </OutlineButton>
  )
);
