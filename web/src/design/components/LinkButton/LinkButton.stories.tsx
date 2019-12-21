import React from 'react';
import { storiesOf } from '@storybook/react';
import { LinkButton } from '@web/design/components/LinkButton/LinkButton';

storiesOf('Hero', module).add(
  'Documentation',
  (): JSX.Element => <LinkButton />
);
