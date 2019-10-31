import { PullRequestList } from '@web/design/components/PullRequestList/PullRequestList';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { noop } from 'lodash';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Selection List', module).add(
  'Documentation',
  (): JSX.Element => (
    <PullRequestList
      showLoadMore={boolean('showLoadMore', false)}
      onLoadMoreClick={noop}
      heading="heading"
      items={[
        {
          key: '1',
          title: 'Hello 1',
          repo: 'repo1',
          onClick: noop,
        },
        {
          key: '2',
          title: 'Hello 2',
          repo: 'repo2',
          onClick: noop,
        },
        {
          key: '3',
          title: 'Hello 3',
          repo: 'repo3',
          onClick: noop,
        },
      ]}
    />
  )
);
