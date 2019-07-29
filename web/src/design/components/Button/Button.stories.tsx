import React from 'react';
import { storiesOf } from '@storybook/react';
// import { Button } from '@web/design/components/Button/Button';
import { Button, ButtonStyle, ButtonSize } from './Button';

storiesOf('Button', module)
  .add(
    'Medium',
    (): JSX.Element => (
      <Button styleOf={ButtonStyle.Primary} size={ButtonSize.Medium}>
        Hello Button
      </Button>
    )
  )
  .add(
    'Small',
    (): JSX.Element => (
      <Button styleOf={ButtonStyle.Primary} size={ButtonSize.Small}>
        Hello Button
      </Button>
    )
  )
  .add(
    'Large',
    (): JSX.Element => (
      <Button styleOf={ButtonStyle.Primary} size={ButtonSize.Large}>
        Hello Button
      </Button>
    )
  );
