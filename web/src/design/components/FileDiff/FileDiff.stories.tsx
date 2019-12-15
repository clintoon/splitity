import React from 'react';
import { FileDiff } from '@web/design/components/FileDiff/FileDiff';
import { storiesOf } from '@storybook/react';
import parseDiff from 'parse-diff';
import {
  GITHUB_SINGLE_CHUNK_SINGLE_FILE_DIFF,
  GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF,
} from '@web/testing/fixtures/pullRequestDiff';

const singleChunkFileDiff = parseDiff(GITHUB_SINGLE_CHUNK_SINGLE_FILE_DIFF)[0];

const multipleChunkFileDiff = parseDiff(
  GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF
)[0];

storiesOf('FileDiff', module)
  .add(
    'Documentation',
    (): JSX.Element => (
      <FileDiff
        filename={{
          to: singleChunkFileDiff.to,
          from: singleChunkFileDiff.from as string,
        }}
        chunks={singleChunkFileDiff.chunks}
      />
    )
  )
  .add(
    'Multiple chunks',
    (): JSX.Element => {
      return (
        <FileDiff
          filename={{
            to: multipleChunkFileDiff.to,
            from: multipleChunkFileDiff.from as string,
          }}
          chunks={multipleChunkFileDiff.chunks}
        />
      );
    }
  );
