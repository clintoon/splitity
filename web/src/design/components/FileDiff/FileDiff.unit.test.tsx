import React from 'react';
import { FileDiff } from '@web/design/components/FileDiff/FileDiff';
import parseDiff from 'parse-diff';
import { GITHUB_SINGLE_FILE_DIFF } from '@web/testing/fixtures/pullRequestDiff';
import { render, RenderResult, within } from '@testing-library/react';
import { CARD_HEADER_TESTID } from '../Card/Card';

interface RenderFileDiffResult {
  renderResult: RenderResult;
}

interface RenderFileDiffOptions {
  filenameTo?: string;
  filenameFrom?: string;
}

const renderFileDiff = ({
  filenameFrom,
  filenameTo,
}: RenderFileDiffOptions): RenderFileDiffResult => {
  const fileDiff = parseDiff(GITHUB_SINGLE_FILE_DIFF)[0];
  const renderResult = render(
    <FileDiff
      filename={{ from: filenameFrom, to: filenameTo }}
      chunks={fileDiff.chunks}
    />
  );

  return { renderResult };
};

describe('<FileDiff/>', (): void => {
  describe('header', (): void => {
    it('displays the correct filename header when it is not renamed', (): void => {
      const { renderResult } = renderFileDiff({
        filenameFrom: 'README.md',
        filenameTo: 'README.md',
      });

      const headerContainer = renderResult.getByTestId(CARD_HEADER_TESTID);
      expect(within(headerContainer).queryByText('README.md')).not.toBe(null);
    });

    it('displays the correct filename header when it has been renamed', (): void => {
      const { renderResult } = renderFileDiff({
        filenameFrom: 'OLD_README.md',
        filenameTo: 'NEW_README.md',
      });

      const headerContainer = renderResult.getByTestId(CARD_HEADER_TESTID);
      expect(
        within(headerContainer).queryByText('OLD_README.md → NEW_README.md')
      ).not.toBe(null);
    });

    it('displays the correct filename header when file has been deleted', (): void => {
      const { renderResult } = renderFileDiff({
        filenameFrom: 'OLD_README.md',
      });

      const headerContainer = renderResult.getByTestId(CARD_HEADER_TESTID);
      expect(within(headerContainer).queryByText('OLD_README.md')).not.toBe(
        null
      );
    });

    it('displays the correct filename header when file has been added', (): void => {
      const { renderResult } = renderFileDiff({
        filenameTo: 'NEW_README.md',
      });

      const headerContainer = renderResult.getByTestId(CARD_HEADER_TESTID);
      expect(within(headerContainer).queryByText('NEW_README.md')).not.toBe(
        null
      );
    });
  });

  describe('diff', (): void => {
    // TODO(clintoon): Should have screenshot testing to avoid testing the implementation
  });
});
