import React from 'react';
import {
  FileDiff,
  FILE_DIFF_CHUNK_SEPARATOR_TESTID,
} from '@web/design/components/FileDiff/FileDiff';
import {
  GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF,
  GITHUB_SINGLE_FILE_SINGLE_CHUNK,
} from '@web/testing/fixtures/pullRequestDiff';
import { render, RenderResult, within, wait } from '@testing-library/react';
import {
  CARD_HEADER_TESTID,
  CARD_BODY_TESTID,
} from '@web/design/components/Card/Card';
import { FILE_DIFF_LINE_TESTID } from '@web/design/components/FileDiff/internal/Line';
import { parseDiff } from '@web/lib/parseDiff/parseDiff';

interface RenderFileDiffResult {
  renderResult: RenderResult;
}

interface RenderFileDiffOptions {
  diff: string;
  filenameTo?: string;
  filenameFrom?: string;
}

const renderFileDiff = ({
  diff,
  filenameFrom,
  filenameTo,
}: RenderFileDiffOptions): RenderFileDiffResult => {
  const fileDiff = parseDiff(diff)[0];

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
        diff: GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF,
        filenameFrom: 'README.md',
        filenameTo: 'README.md',
      });

      const headerContainer = renderResult.getByTestId(CARD_HEADER_TESTID);
      expect(within(headerContainer).queryByText('README.md')).not.toBe(null);
    });

    it('displays the correct filename header when it has been renamed', (): void => {
      const { renderResult } = renderFileDiff({
        diff: GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF,
        filenameFrom: 'OLD_README.md',
        filenameTo: 'NEW_README.md',
      });

      const headerContainer = renderResult.getByTestId(CARD_HEADER_TESTID);
      expect(
        within(headerContainer).queryByText('OLD_README.md → NEW_README.md')
      ).not.toBe(null);
    });

    it('throws error when to filename is missing', async (): Promise<void> => {
      // Mocking logError to not dump error to console
      const consoleErrSpy = jest.spyOn(console, 'error');
      consoleErrSpy.mockImplementation((): void => {});

      const toThrow = async (): Promise<void> => {
        renderFileDiff({
          diff: GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF,
          filenameFrom: 'README.md',
        });
        await wait();
      };

      await expect(toThrow()).rejects.toThrowErrorMatchingInlineSnapshot(
        `"FileDiff: file path not specified"`
      );

      consoleErrSpy.mockRestore();
    });

    it('throws error when from filename is missing', async (): Promise<
      void
    > => {
      // Mocking logError to not dump error to console
      const consoleErrSpy = jest.spyOn(console, 'error');
      consoleErrSpy.mockImplementation((): void => {});

      const toThrow = async (): Promise<void> => {
        renderFileDiff({
          diff: GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF,
          filenameTo: 'README.md',
        });
        await wait();
      };

      await expect(toThrow()).rejects.toThrowErrorMatchingInlineSnapshot(
        `"FileDiff: file path not specified"`
      );

      consoleErrSpy.mockRestore();
    });
  });

  describe('diff', (): void => {
    // TODO(clintoon): Should also have screenshot testing to avoid testing the implementation

    it('displays the correct number of chunk separator', (): void => {
      const { renderResult } = renderFileDiff({
        diff: GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF,
        filenameFrom: 'README.md',
        filenameTo: 'README.md',
      });

      const bodyContainer = renderResult.getByTestId(CARD_BODY_TESTID);
      expect(
        within(bodyContainer).getAllByTestId(FILE_DIFF_CHUNK_SEPARATOR_TESTID)
          .length
      ).toBe(2);
    });

    it('displays the correct number lines', (): void => {
      const { renderResult } = renderFileDiff({
        diff: GITHUB_SINGLE_FILE_SINGLE_CHUNK,
        filenameFrom: 'README.md',
        filenameTo: 'README.md',
      });

      const bodyContainer = renderResult.getByTestId(CARD_BODY_TESTID);
      expect(
        within(bodyContainer).getAllByTestId(FILE_DIFF_LINE_TESTID).length
      ).toBe(44);
    });
  });
});
