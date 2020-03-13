import React from 'react';
import { Footer as DesignFooter } from '@web/design/components/Footer/Footer';

const Footer = (): JSX.Element => {
  return (
    <DesignFooter
      text="Copyright © 2020 Splitity Pty Ltd"
      links={[
        {
          id: 'terms',
          text: 'Terms & conditions',
          to: '/terms-and-conditions',
        },
        {
          id: 'privacy',
          text: 'Privacy policy',
          to: '/privacy-policy',
        },
        {
          id: 'contact-us',
          text: 'Contact Us',
          to: 'mailto:support@splitity.com',
          external: true,
        },
      ]}
    />
  );
};

export { Footer };
