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
import {
  CURRENT_USER_PULL_REQUESTS_QUERY,
  OpenPullRequestsState,
} from '@web/lib/apollo/github/useCurrentUserPullRequestsQuery';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';

jest.mock('@web/lib/github/github');

interface RenderGithubDashboardPage {
  renderResult: RenderResult;
  history: History;
}

const END_CURSOR = 'end cursor';

const emptyPagePullRequestMock: readonly MockedResponse[] = [
  {
    request: {
      query: CURRENT_USER_PULL_REQUESTS_QUERY,
      variables: {
        first: 5,
        cursor: null,
        states: OpenPullRequestsState,
      },
    },
    result: {
      data: {
        viewer: {
          pullRequests: {
            pageInfo: {
              hasNextPage: false,
              endCursor: null,
            },
            nodes: [],
          },
        },
      },
    },
  },
];

const displayAllPRsNoLoadMorePullRequestMock: readonly MockedResponse[] = [
  {
    request: {
      query: CURRENT_USER_PULL_REQUESTS_QUERY,
      variables: {
        first: 5,
        cursor: null,
        states: OpenPullRequestsState,
      },
    },
    result: {
      data: {
        viewer: {
          pullRequests: {
            pageInfo: {
              hasNextPage: false,
              endCursor: null,
            },
            nodes: [
              {
                title: 'title1',
                number: 1,
                repository: {
                  url: 'https://github.com/clintoon/repo1',
                  nameWithOwner: 'clintoon/repo1',
                },
              },
            ],
          },
        },
      },
    },
  },
];

const displaysLoadMoreButtonPullRequestMock: readonly MockedResponse[] = [
  {
    request: {
      query: CURRENT_USER_PULL_REQUESTS_QUERY,
      variables: {
        first: 5,
        cursor: null,
        states: OpenPullRequestsState,
      },
    },
    result: {
      data: {
        viewer: {
          pullRequests: {
            pageInfo: {
              hasNextPage: true,
              endCursor: END_CURSOR,
            },
            nodes: [
              {
                title: 'title1',
                number: 1,
                repository: {
                  url: 'https://github.com/clintoon/repo1',
                  nameWithOwner: 'clintoon/repo1',
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    request: {
      query: CURRENT_USER_PULL_REQUESTS_QUERY,
      variables: {
        first: 5,
        cursor: END_CURSOR,
        states: OpenPullRequestsState,
      },
    },
    result: {
      data: {
        viewer: {
          pullRequests: {
            pageInfo: {
              hasNextPage: false,
              endCursor: null,
            },
            nodes: [
              {
                title: 'title2',
                number: 2,
                repository: {
                  url: 'https://github.com/clintoon/repo2',
                  nameWithOwner: 'clintoon/repo2',
                },
              },
            ],
          },
        },
      },
    },
  },
];

interface RenderGithubDashboardPageOptions {
  mocks: readonly MockedResponse[];
}

const renderGithubDashboardPage = ({
  mocks,
}: RenderGithubDashboardPageOptions): RenderGithubDashboardPage => {
  const history = createMemoryHistory({
    initialEntries: [GithubRoutePath.AppRoot],
  });

  const renderResult = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router history={history}>
        <GithubDashboardPage />
      </Router>
    </MockedProvider>
  );

  return { renderResult, history };
};

describe('GithubDashboard', (): void => {
  it('displays empty page content when there are no PRs', async (): Promise<
    void
  > => {
    const { renderResult } = renderGithubDashboardPage({
      mocks: emptyPagePullRequestMock,
    });

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

    const { renderResult } = renderGithubDashboardPage({
      mocks: emptyPagePullRequestMock,
    });

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

    const { renderResult } = renderGithubDashboardPage({
      mocks: displayAllPRsNoLoadMorePullRequestMock,
    });

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
    const { renderResult } = renderGithubDashboardPage({
      mocks: displaysLoadMoreButtonPullRequestMock,
    });

    const title2 = 'title2';
    const nameWithOwner2 = 'clintoon/repo2';

    await wait((): void => {
      const loadMoreButtonContainer = within(
        renderResult.getByTestId(LOAD_MORE_SECTION_TESTID)
      ).getByTestId(BUTTON_TESTID);

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
    const nameWithOwner = 'clintoon/repo1';
    const number = 1;

    const { renderResult, history } = renderGithubDashboardPage({
      mocks: displayAllPRsNoLoadMorePullRequestMock,
    });

    await wait((): void => {
      const itemContainer = renderResult.getByTestId(ITEM_TESTID);
      fireEvent.click(itemContainer);
      expect(history.location.pathname).toBe(`/gh/${nameWithOwner}/${number}`);
    });
  });
});
