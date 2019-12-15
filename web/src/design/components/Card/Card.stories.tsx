import React from 'react';
import { Card } from '@web/design/components/Card/Card';
import { storiesOf } from '@storybook/react';

storiesOf('Card', module).add(
  'Documentation',
  (): JSX.Element => (
    <Card header="header">
      <div>body</div>
    </Card>
  )
);
