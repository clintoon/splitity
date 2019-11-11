import React from 'react';
import {
  render,
  within,
  fireEvent,
  wait,
  RenderResult,
} from '@testing-library/react';
import {
  GithubDashboardPage,
  EMPTY_BODY_TESTID,
} from '@web/pages/GithubDashboard/GithubDashboard';
import { GithubAPI, PullRequest } from '@web/lib/github/github';
import {
  ITEM_TESTID,
  LOAD_MORE_SECTION_TESTID,
} from '@web/design/components/PullRequestList/PullRequestList';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';
import * as openPage from '@web/lib/actions/openPage';
import { noop } from 'lodash';
import { Router } from 'react-router';
import { GithubRoutePath } from '@web/constants/routes';
import { createMemoryHistory, History } from 'history';

jest.mock('@web/lib/github/github');

const END_CURSOR = 'end cursor';

interface RenderGithubDashboardPage {
  renderResult: RenderResult;
  history: History;
}

interface MockGithubAPIOptions {
  loadMore: boolean;
  pullRequests: PullRequest[];
}

const mockGithubAPI = (options: MockGithubAPIOptions): void => {
  const pageInfo = options.loadMore
    ? {
        hasNextPage: true,
        endCursor: END_CURSOR,
      }
    : {
        hasNextPage: false,
        endCursor: null,
      };

  (GithubAPI.prototype
    .getCurrentUserPullRequests as jest.Mock).mockResolvedValue({
    pageInfo,
    nodes: options.pullRequests,
  });
};

const renderGithubDashboardPage = (): RenderGithubDashboardPage => {
  const history = createMemoryHistory({
    initialEntries: [GithubRoutePath.AppRoot],
  });

  const renderResult = render(
    <Router history={history}>
      <GithubDashboardPage />
    </Router>
  );

  return { renderResult, history };
};

describe('GithubDashboard', (): void => {
  it('displays empty page content when there are no PRs', async (): Promise<
    void
  > => {
    mockGithubAPI({ loadMore: false, pullRequests: [] });
    const { renderResult } = renderGithubDashboardPage();

    await wait((): void => {
      expect(renderResult.queryByTestId(EMPTY_BODY_TESTID)).not.toBe(null);
    });
  });

  it('clicking on the empty page button opens window to github app configure page', async (): Promise<
    void
  > => {
    const addReposClickSpy = jest
      .spyOn(openPage, 'onAddReposClick')
      .mockImplementation(noop);

    mockGithubAPI({ loadMore: false, pullRequests: [] });
    const { renderResult } = renderGithubDashboardPage();

    await wait((): void => {
      const buttonContainer = within(
        renderResult.getByTestId(EMPTY_BODY_TESTID)
      ).getByTestId(BUTTON_TESTID);

      fireEvent.click(buttonContainer);

      expect(addReposClickSpy).toHaveBeenCalled();
    });
  });

  it('displays all PRs when there are PRs and no load more button', async (): Promise<
    void
  > => {
    const title = 'title1';
    const nameWithOwner = 'clintoon/repo1';

    mockGithubAPI({
      loadMore: false,
      pullRequests: [
        {
          title,
          number: 1,
          repository: {
            url: 'https://github.com/clintoon/repo1',
            nameWithOwner,
          },
        },
      ],
    });

    const { renderResult } = renderGithubDashboardPage();

    await wait((): void => {
      const itemContainer = renderResult.getByTestId(ITEM_TESTID);
      expect(within(itemContainer).queryByText(title)).not.toBe(null);
      expect(within(itemContainer).queryByText(nameWithOwner)).not.toBe(null);
      expect(renderResult.queryByTestId(LOAD_MORE_SECTION_TESTID)).toBe(null);
    });
  });

  it('loads more PRs when load more button is clicked', async (): Promise<
    void
  > => {
    mockGithubAPI({
      loadMore: true,
      pullRequests: [
        {
          title: 'title1',
          number: 1,
          repository: {
            url: 'https://github.com/clintoon/repo1',
            nameWithOwner: 'clintoon/repo1',
          },
        },
      ],
    });

    const { renderResult } = renderGithubDashboardPage();

    const title2 = 'title2';
    const nameWithOwner2 = 'clintoon/repo2';

    await wait((): void => {
      const loadMoreButtonContainer = within(
        renderResult.getByTestId(LOAD_MORE_SECTION_TESTID)
      ).getByTestId(BUTTON_TESTID);

      mockGithubAPI({
        loadMore: true,
        pullRequests: [
          {
            title: title2,
            number: 2,
            repository: {
              url: 'https://github.com/clintoon/repo2',
              nameWithOwner: nameWithOwner2,
            },
          },
        ],
      });

      fireEvent.click(loadMoreButtonContainer);
    });

    await wait((): void => {
      expect(within(renderResult.container).queryByText(title2)).not.toBe(null);
      expect(
        within(renderResult.container).queryByText(nameWithOwner2)
      ).not.toBe(null);
    });
  });

  it('redirects to split prs route when item is pressed', async (): Promise<
    void
  > => {
    const title = 'title1';
    const nameWithOwner = 'clintoon/repo1';
    const number = 1;

    mockGithubAPI({
      loadMore: false,
      pullRequests: [
        {
          title,
          number,
          repository: {
            url: 'https://github.com/clintoon/repo1',
            nameWithOwner,
          },
        },
      ],
    });

    const { renderResult, history } = renderGithubDashboardPage();

    await wait((): void => {
      const itemContainer = renderResult.getByTestId(ITEM_TESTID);
      fireEvent.click(itemContainer);
      expect(history.location.pathname).toBe(`/gh/${nameWithOwner}/${number}`);
    });
  });
});
