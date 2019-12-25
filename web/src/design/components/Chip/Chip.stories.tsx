import React from 'react';
import { storiesOf } from '@storybook/react';
import { Chip } from '@web/design/components/Chip/Chip';
import { text, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Color } from '@web/design/styles/color';
import { TextWeight } from '../Text/Text';

storiesOf('Chip', module).add(
  'Documentation',
  (): JSX.Element => (
    <Chip
      label={text('label', 'label')}
      onClick={boolean('onClick', true) ? action('onClick') : undefined}
      onDelete={boolean('onDelete', true) ? action('onDelete') : undefined}
      borderColor={select('borderColor', Object.values(Color), undefined)}
      fontWeight={select(
        'fontWeight',
        Object.values(TextWeight),
        TextWeight.Normal
      )}
    />
  )
);
