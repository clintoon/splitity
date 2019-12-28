import React from 'react';
import {
  PRFileDiff,
  FILE_DIFF_CHUNK_SEPARATOR_TESTID,
  NOT_ALLOCED_HUNK_TEST_ID,
  ALLOCED_HUNK_TEST_ID,
  NORMAL_LINEGROUP_TEST_ID,
  PRFileDiffLineGroup,
} from '@web/design/components/PRFileDiff/PRFileDiff';
import {
  GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF,
  GITHUB_SINGLE_FILE_SINGLE_CHUNK,
  GITHUB_SINGLE_CHUNK_SINGLE_FILE_DIFF,
} from '@web/testing/fixtures/pullRequestDiff';
import {
  render,
  RenderResult,
  within,
  wait,
  fireEvent,
} from '@testing-library/react';
import {
  CARD_HEADER_TESTID,
  CARD_BODY_TESTID,
} from '@web/design/components/Card/Card';
import { FILE_DIFF_LINE_TESTID } from '@web/design/components/PRFileDiff/internal/Line';
import { parseDiff, FileDiff } from '@web/lib/parseDiff/parseDiff';

const FILE_DIFF_ID = '1';

interface RenderFileDiffResult {
  renderResult: RenderResult;
  onHunkClickMock: jest.Mock;
}

interface RenderFileDiffOptions {
  fileDiff: FileDiff;
  filenameTo?: string;
  filenameFrom?: string;
}

const renderPRFileDiff = ({
  fileDiff,
  filenameFrom,
  filenameTo,
}: RenderFileDiffOptions): RenderFileDiffResult => {
  // const fileDiff = parseDiff(diff)[0];
  const onHunkClickMock = jest.fn();

  const renderResult = render(
    <PRFileDiff
      filename={{ from: filenameFrom, to: filenameTo }}
      chunks={fileDiff.chunks}
      onHunkClick={onHunkClickMock}
      fileDiffId={FILE_DIFF_ID}
    />
  );

  return { renderResult, onHunkClickMock };
};

const getFileDiff = (diff: string): FileDiff => {
  const fileDiff = parseDiff(diff)[0];
  return fileDiff;
};

describe('<PRFileDiff/>', (): void => {
  describe('header', (): void => {
    it('displays the correct filename header when it is not renamed', (): void => {
      const { renderResult } = renderPRFileDiff({
        fileDiff: getFileDiff(GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF),
        filenameFrom: 'README.md',
        filenameTo: 'README.md',
      });

      const headerContainer = renderResult.getByTestId(CARD_HEADER_TESTID);
      expect(within(headerContainer).queryByText('README.md')).not.toBe(null);
    });

    it('displays the correct filename header when it has been renamed', (): void => {
      const { renderResult } = renderPRFileDiff({
        fileDiff: getFileDiff(GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF),
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
        renderPRFileDiff({
          fileDiff: getFileDiff(GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF),
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
        renderPRFileDiff({
          fileDiff: getFileDiff(GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF),
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
      const { renderResult } = renderPRFileDiff({
        fileDiff: getFileDiff(GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF),
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
      const { renderResult } = renderPRFileDiff({
        fileDiff: getFileDiff(GITHUB_SINGLE_FILE_SINGLE_CHUNK),
        filenameFrom: 'README.md',
        filenameTo: 'README.md',
      });

      const bodyContainer = renderResult.getByTestId(CARD_BODY_TESTID);
      expect(
        within(bodyContainer).getAllByTestId(FILE_DIFF_LINE_TESTID).length
      ).toBe(44);
    });
  });

  it('displays the correct number of unallocated hunks', (): void => {
    const { renderResult } = renderPRFileDiff({
      fileDiff: getFileDiff(GITHUB_SINGLE_CHUNK_SINGLE_FILE_DIFF),
      filenameFrom: 'README.md',
      filenameTo: 'README.md',
    });

    const bodyContainer = renderResult.getByTestId(CARD_BODY_TESTID);
    expect(
      within(bodyContainer).getAllByTestId(NOT_ALLOCED_HUNK_TEST_ID).length
    ).toBe(1);
  });

  it('displays the correct number of allocated hunks', (): void => {
    const fileDiff = getFileDiff(GITHUB_SINGLE_CHUNK_SINGLE_FILE_DIFF);
    (fileDiff.chunks[0].lineGroups[1] as PRFileDiffLineGroup).color = '#123123';

    const { renderResult } = renderPRFileDiff({
      fileDiff,
      filenameFrom: 'README.md',
      filenameTo: 'README.md',
    });

    const bodyContainer = renderResult.getByTestId(CARD_BODY_TESTID);
    expect(
      within(bodyContainer).getAllByTestId(ALLOCED_HUNK_TEST_ID).length
    ).toBe(1);
  });

  it('displays the correct number of normal linegroups', (): void => {
    const { renderResult } = renderPRFileDiff({
      fileDiff: getFileDiff(GITHUB_SINGLE_CHUNK_SINGLE_FILE_DIFF),
      filenameFrom: 'README.md',
      filenameTo: 'README.md',
    });

    const bodyContainer = renderResult.getByTestId(CARD_BODY_TESTID);
    expect(
      within(bodyContainer).getAllByTestId(NORMAL_LINEGROUP_TEST_ID).length
    ).toBe(1);
  });

  it('does not trigger the onHunkClick if the lineGroup which is not a unallocated hunk when clicked', (): void => {
    const { renderResult, onHunkClickMock } = renderPRFileDiff({
      fileDiff: getFileDiff(GITHUB_SINGLE_CHUNK_SINGLE_FILE_DIFF),
      filenameFrom: 'README.md',
      filenameTo: 'README.md',
    });

    const bodyContainer = renderResult.getByTestId(CARD_BODY_TESTID);
    const normalLineGroupContainer = within(bodyContainer).getByTestId(
      NORMAL_LINEGROUP_TEST_ID
    );

    fireEvent.click(normalLineGroupContainer);

    expect(onHunkClickMock).not.toBeCalled();
  });

  it('does triggers the onHunkClick if the lineGroup which is a unallocated hunk when clicked', (): void => {
    const { renderResult, onHunkClickMock } = renderPRFileDiff({
      fileDiff: getFileDiff(GITHUB_SINGLE_CHUNK_SINGLE_FILE_DIFF),
      filenameFrom: 'README.md',
      filenameTo: 'README.md',
    });

    const bodyContainer = renderResult.getByTestId(CARD_BODY_TESTID);
    const normalLineGroupContainer = within(bodyContainer).getByTestId(
      NOT_ALLOCED_HUNK_TEST_ID
    );

    fireEvent.click(normalLineGroupContainer);

    expect(onHunkClickMock).toBeCalled();
  });

  it('does not triggers the onHunkClick if the lineGroup which is a unallocated hunk when clicked when clickDisabled is true', (): void => {
    const fileDiff = getFileDiff(GITHUB_SINGLE_CHUNK_SINGLE_FILE_DIFF);
    (fileDiff.chunks[0]
      .lineGroups[1] as PRFileDiffLineGroup).clickDisabled = true;

    const { renderResult, onHunkClickMock } = renderPRFileDiff({
      fileDiff,
      filenameFrom: 'README.md',
      filenameTo: 'README.md',
    });

    const bodyContainer = renderResult.getByTestId(CARD_BODY_TESTID);
    const normalLineGroupContainer = within(bodyContainer).getByTestId(
      NOT_ALLOCED_HUNK_TEST_ID
    );

    fireEvent.click(normalLineGroupContainer);

    expect(onHunkClickMock).not.toBeCalled();
  });
});
