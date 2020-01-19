import React from 'react';
import { Hero } from '@web/design/components/Hero/Hero';
import { Color } from '@web/design/styles/color';
import { handleSignIn } from '@web/lib/eventHandlers/auth';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { InfoPanel } from '@web/design/components/InfoPanel/InfoPanel';
import DevProductivity from '@web/design/svg/undraw_dev_productivity.svg';
import { InfoGrid } from '@web/design/components/InfoGrid/InfoGrid';
import { Footer } from '@web/design/components/Footer/Footer';

const RoundedCorners = styled.div`
  border-radius: 25px;
  overflow: hidden;
  z-index: 1;
`;

const HowItWorksSection = styled.div`
  margin: 200px 0 0 0;
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
            <ReactPlayer
              url="https://www.youtube.com/watch?v=9bZkp7q19f0"
              muted
              light
              controls
              width="960px"
              height="540px"
            />
          </RoundedCorners>
        }
      />
      <HowItWorksSection>
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
      </HowItWorksSection>
      <InfoPanel
        title="Why use Splitity?"
        bulletPoints={[
          'Split big pull requests into atomic code reviews and encourage good pull request practices within your team.',
          'Save the time and trouble with doing it manually. Just click and go.',
        ]}
        color={Color.White}
        illustration={<DevProductivity />}
      />
      <Footer text="Copyright © 2020 Splitity Pty Ltd. All Rights Reserved" />
    </div>
  );
};

export { HomePage };
