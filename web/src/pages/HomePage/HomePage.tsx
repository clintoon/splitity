import React from 'react';
import { Hero } from '@web/design/components/Hero/Hero';
import { Color } from '@web/design/styles/color';
import { handleSignIn } from '@web/lib/eventHandlers/auth';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const RoundedCorners = styled.div`
  border-radius: 25px;
  overflow: hidden;
  z-index: 1;
`;

const HomePage = (): JSX.Element => {
  return (
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
  );
};

export { HomePage };
