import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { IllustrationDisplay } from './IllustrationDisplay';
import PageNotFoundSvg from '@web/design/svg/undraw_page_not_found.svg';

storiesOf('IllustrationDisplay', module).add(
  'Documentation',
  (): JSX.Element => (
    <IllustrationDisplay img={<PageNotFoundSvg />} text={text('text', '')} />
  )
);
