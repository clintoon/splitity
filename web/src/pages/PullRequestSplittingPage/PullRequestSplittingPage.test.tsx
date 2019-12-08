import React from 'react';
import { render, RenderResult, wait, within } from '@testing-library/react';
import { PullRequestSplittingPage } from '@web/pages/PullRequestSplittingPage/PullRequestSplittingPage';
import { PULL_REQUEST_INFO_TESTID } from '@web/pages/PullRequestSplittingPage/PullRequestInfo';
import { GithubAPI } from '@web/lib/github/github';

jest.mock('@web/lib/github/github');

const TITLE = '[TICKET-123] Update readme';
const OWNER = 'clintoon';
const REPO_NAME = 'test01';

interface RenderPullRequestSplittingPageResult {
  renderResult: RenderResult;
}

const renderPullRequestSplittingPage = (): RenderPullRequestSplittingPageResult => {
  jest.spyOn(GithubAPI.prototype, 'getPullRequestInfo').mockResolvedValue({
    title: TITLE,
  });

  const renderResult = render(
    <PullRequestSplittingPage
      match={{
        isExact: true,
        url: 'http://localhost:8080/clintoon/test01/pull/123',
        path: '/clintoon/test01/pull/123',
        params: {
          owner: OWNER,
          repoName: REPO_NAME,
          pullRequestId: '123',
        },
      }}
    />
  );

  return { renderResult };
};

describe('<PullRequestSplittingPage />', (): void => {
  describe('PullRequestInfo', (): void => {
    it('displays PullRequestInfo', async (): Promise<void> => {
      const { renderResult } = renderPullRequestSplittingPage();
      await wait((): void => {
        expect(renderResult.queryByTestId(PULL_REQUEST_INFO_TESTID)).not.toBe(
          null
        );
      });
    });

    it('displays the PR title', async (): Promise<void> => {
      const { renderResult } = renderPullRequestSplittingPage();
      await wait((): void => {
        const prInfoContainer = renderResult.getByTestId(
          PULL_REQUEST_INFO_TESTID
        );

        expect(within(prInfoContainer).queryByText(TITLE)).not.toBe(null);
      });
    });

    it('displays the owner  & repoName', async (): Promise<void> => {
      const { renderResult } = renderPullRequestSplittingPage();
      await wait((): void => {
        const prInfoContainer = renderResult.getByTestId(
          PULL_REQUEST_INFO_TESTID
        );
        expect(
          within(prInfoContainer).queryByText(`${OWNER}/${REPO_NAME}`)
        ).not.toBe(null);
      });
    });
  });
});
