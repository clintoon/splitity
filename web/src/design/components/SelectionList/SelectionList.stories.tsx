import { SelectionList } from '@web/design/components/SelectionList/SelectionList';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { noop } from 'lodash';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Selection List', module).add(
  'Documentation',
  (): JSX.Element => (
    <SelectionList
      showLoadMore={boolean('showLoadMore', false)}
      onLoadMoreClick={noop}
      heading="heading"
      items={[
        {
          key: '1',
          text: 'Hello 1',
          onClick: noop,
        },
        {
          key: '2',
          text: 'Hello 2',
          onClick: noop,
        },
        {
          key: '3',
          text: 'Hello 3',
          onClick: noop,
        },
      ]}
    />
  )
);
