import React from 'react';
import { Footer } from '@web/design/components/Footer/Footer';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { BrowserRouter } from 'react-router-dom';

storiesOf('Footer', module)
  .add(
    'Documentation',
    (): JSX.Element => (
      <Footer text={text('text', 'Splitity © 2020')} links={[]} />
    )
  )
  .add(
    'has links',
    (): JSX.Element => (
      <BrowserRouter>
        <Footer
          text={text('text', 'Splitity © 2020')}
          links={[
            {
              id: 'terms',
              text: 'Terms & conditions',
              to: '/',
            },
            {
              id: 'privacy',
              text: 'Privacy policy',
              to: '/',
            },
          ]}
        />
      </BrowserRouter>
    )
  );
