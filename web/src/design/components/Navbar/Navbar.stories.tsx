import React from 'react';
import { storiesOf } from '@storybook/react';
import { Navbar } from '@web/design/components/Navbar/Navbar';
import {
  Button,
  ButtonStyle,
  ButtonSize,
} from '@web/design/components/Button/Button';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';

storiesOf('Navbar', module).add(
  'Documentation',
  (): JSX.Element => (
    <React.Fragment>
      <GlobalStyle />
      <Navbar
        leftItems={[
          <Button
            styleOf={ButtonStyle.Secondary}
            size={ButtonSize.Medium}
            key="label1"
          >
            Label1
          </Button>,
          <Button
            styleOf={ButtonStyle.Primary}
            size={ButtonSize.Medium}
            key="label2"
          >
            Label2
          </Button>,
        ]}
        rightItems={[
          <Button
            styleOf={ButtonStyle.Secondary}
            size={ButtonSize.Medium}
            key="label3"
          >
            Label3
          </Button>,
          <Button
            styleOf={ButtonStyle.Primary}
            size={ButtonSize.Medium}
            key="label4"
          >
            Label4
          </Button>,
        ]}
      />
    </React.Fragment>
  )
);
