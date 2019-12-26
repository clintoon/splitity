import React from 'react';
import { PRFileDiff } from '@web/design/components/PRFileDiff/PRFileDiff';
import { storiesOf } from '@storybook/react';
import {
  GITHUB_SINGLE_CHUNK_SINGLE_FILE_DIFF,
  GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF,
} from '@web/testing/fixtures/pullRequestDiff';
import { parseDiff } from '@web/lib/parseDiff/parseDiff';
import { action } from '@storybook/addon-actions';

const singleChunkFileDiff = parseDiff(GITHUB_SINGLE_CHUNK_SINGLE_FILE_DIFF)[0];

const multipleChunkFileDiff = parseDiff(
  GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF
)[0];

storiesOf('PRFileDiff', module)
  .add(
    'Documentation',
    (): JSX.Element => (
      <PRFileDiff
        filename={{
          to: singleChunkFileDiff.to,
          from: singleChunkFileDiff.from as string,
        }}
        chunks={singleChunkFileDiff.chunks}
        onHunkClick={action('onHunkClick')}
      />
    )
  )
  .add(
    'Multiple chunks',
    (): JSX.Element => {
      return (
        <PRFileDiff
          filename={{
            to: multipleChunkFileDiff.to,
            from: multipleChunkFileDiff.from as string,
          }}
          chunks={multipleChunkFileDiff.chunks}
          onHunkClick={action('onHunkClick')}
        />
      );
    }
  );
