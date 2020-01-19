import React from 'react';
import { Pricing } from '@web/design/components/Pricing/Pricing';
import { storiesOf } from '@storybook/react';

storiesOf('Pricing', module).add(
  'Documentation',
  (): JSX.Element => (
    <Pricing
      title="Pricing"
      plans={[
        {
          head: 'Open source & personal accounts',
          content: 'Public and personal account repos are free',
          price: 0,
        },
        {
          head: 'Organization accounts',
          content: 'Unlimited repos on organization accounts',
          price: 0,
        },
      ]}
    />
  )
);
