import React from 'react';
import { storiesOf } from '@storybook/react';
import { Chip } from '@web/design/components/Chip/Chip';
import { ChipArray } from '@web/design/components/Chip/ChipArray';
import { action } from '@storybook/addon-actions';
import _ from 'lodash';

storiesOf('ChipArray', module).add(
  'Documentation',
  (): JSX.Element => (
    <ChipArray>
      {_.range(0, 8).map(
        (val): JSX.Element => {
          return (
            <Chip
              key={val}
              label={`chip ${val}`}
              onClick={action(`onClick ${val}`)}
              onDelete={action(`onDelete ${val}`)}
            />
          );
        }
      )}
    </ChipArray>
  )
);
