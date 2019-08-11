import React from 'react';
import { Hero } from '@web/design/components/Hero/Hero';
import { Color } from '@web/design/styles/color';
import { noop } from 'lodash';

const HomePage = (): JSX.Element => {
  return (
    <Hero
      title="Split-my-prs"
      subtitle="The easier way to split your pull requests"
      backgroundColor={Color.LightOrange}
      button={{
        label: 'Sign up',
        onClick: noop,
      }}
    />
  );
};

export { HomePage };
