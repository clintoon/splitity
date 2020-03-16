import React from 'react';
import { Hero } from '@web/design/components/Hero/Hero';
import { Color } from '@web/design/styles/color';
import { handleSignIn } from '@web/lib/eventHandlers/auth';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { InfoPanel } from '@web/design/components/InfoPanel/InfoPanel';
import DevProductivity from '@web/design/svg/undraw_dev_productivity.svg';
import { InfoGrid } from '@web/design/components/InfoGrid/InfoGrid';
import { Pricing } from '@web/design/components/Pricing/Pricing';

const PlayerWrapper = styled.div`
  z-index: 1;
  position: relative;
  padding-top: 56.25%;
`;

const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const HomePage = (): JSX.Element => {
  return (
    <div>
      <Hero
        title="Splitity"
        subtitle="The easier way to split your pull requests"
        backgroundColor={Color.Gray50}
        button={{
          label: 'Sign up',
          onClick: handleSignIn,
        }}
        body={
          <PlayerWrapper>
            <StyledReactPlayer
              url="https://youtu.be/payxAlyG_fw"
              muted
              light
              controls
              width="100%"
              height="100%"
            />
          </PlayerWrapper>
        }
      />
      <InfoGrid
        title="How it works?"
        color={Color.Gray100}
        items={[
          {
            head: 'Allocate your changes across different pull requests.',
            content:
              'Use our easy to use interface to highlight code changes within and across your files into different pull requests',
          },
          {
            head: 'Split',
            content: 'We will automatically create the those pull requests',
          },
        ]}
      />
      <InfoPanel
        title="Why use Splitity?"
        bulletPoints={[
          'Easily split your pull requests into more atomic chunks when needed, and save time while doing so when compared to doing it manually',
        ]}
        color={Color.White}
        illustration={<DevProductivity width="100%" height="100%" />}
      />
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
            price: 30,
            banner: '1 month free trial. No credit card required.',
          },
        ]}
      />
    </div>
  );
};

export { HomePage };
