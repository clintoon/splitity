import React from 'react';
import { InfoPanel } from '@web/design/components/InfoPanel/InfoPanel';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import { Color } from '@web/design/styles/color';
import styled from 'styled-components';

const IllustrationPlaceholder = styled.div`
  height: 400px;
  width: 400px;
  background-color: ${Color.Gray500};
`;

storiesOf('InfoPanel', module).add(
  'Documentation',
  (): JSX.Element => (
    <InfoPanel
      color={select('color', Object.values(Color), Color.Gray200)}
      title={text('title', 'title')}
      bulletPoints={['point 1', 'point 2']}
      illustration={<IllustrationPlaceholder />}
    />
  )
);
