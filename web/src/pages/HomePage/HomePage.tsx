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

const RoundedCorners = styled.div`
  border-radius: 25px;
  overflow: hidden;
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
          <RoundedCorners>
            <StyledReactPlayer
              url="https://www.youtube.com/watch?v=9bZkp7q19f0"
              muted
              light
              controls
              width="100%"
              height="100%"
            />
          </RoundedCorners>
        }
      />
      <InfoGrid
        title="How it works?"
        color={Color.Gray100}
        items={[
          {
            head: 'Allocate your changes across different pull requests.',
            content:
              'Use our easy to use interface to click and highlight code changes within and across your files into different pull requests',
          },
          {
            head: 'Split',
            content:
              'When your ready, with the click of a button, we will automatically create the newly split pull requests',
          },
        ]}
      />
      <InfoPanel
        title="Why use Splitity?"
        bulletPoints={[
          'Split big pull requests into atomic code reviews and encourage good pull request practices within your team.',
          'Save the time and trouble with doing it manually. Just click and go.',
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
