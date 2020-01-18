import React from 'react';
import { Hero } from '@web/design/components/Hero/Hero';
import { Color } from '@web/design/styles/color';
import { handleSignIn } from '@web/lib/eventHandlers/auth';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { InfoPanel } from '@web/design/components/InfoPanel/InfoPanel';
import DevProductivity from '@web/design/svg/undraw_dev_productivity.svg';

const RoundedCorners = styled.div`
  border-radius: 25px;
  overflow: hidden;
  z-index: 1;
`;

const WhySplititySection = styled.div`
  margin: 250px 0 0 0;
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
      <WhySplititySection>
        <InfoPanel
          title="Why use Splitity?"
          bulletPoints={[
            'Split big pull requests into atomic code reviews and encourage good pull request practices within your team.',
            'Save the time and trouble with doing it manually. Just click and go.',
          ]}
          color={Color.Gray100}
          illustration={<DevProductivity />}
        />
      </WhySplititySection>
    </div>
  );
};

export { HomePage };
