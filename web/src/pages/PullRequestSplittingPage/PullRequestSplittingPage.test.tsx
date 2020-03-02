import React from 'react';
import {
  render,
  RenderResult,
  wait,
  within,
  fireEvent,
} from '@testing-library/react';
import { PullRequestSplittingPage } from '@web/pages/PullRequestSplittingPage/PullRequestSplittingPage';
import {
  PR_SPLITTING_PAGE_DIFFS_SECTION_TESTID,
  PR_SPLITTING_PAGE_FILE_DIFF_TESTID,
  PR_SPLITTING_PAGE_LOADING_TESTID,
} from '@web/pages/PullRequestSplittingPage/PullRequestsFileDiffs';
import { PULL_REQUEST_INFO_TESTID } from '@web/pages/PullRequestSplittingPage/PullRequestInfo';
import { GITHUB_MULTIPLE_FILE_DIFF } from '@web/testing/fixtures/pullRequestDiff';
import {
  PULL_REQUEST_CONTROL_PANEL_TESTID,
  ADD_PR_SECTION_TESTID,
  EDIT_PRS_SECTION_TESTID,
  EDITING_TEXT_LABEL,
  NOT_EDITING_TEXT_LABEL,
  SELECTED_PR_CHIP_TESTID,
  SPLIT_PR_BUTTON_SECTION_TESTID,
} from './PullRequestControlPanel';
import {
  CHIP_TESTID,
  CHIP_DELETE_BUTTON_TESTID,
} from '@web/design/components/Chip/Chip';
import { TEXT_INPUT_TESTID } from '@web/design/components/TextInput/TextInput';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';
import { TEXT_BUTTON_TESTID } from '@web/design/components/Button/TextButton';
import {
  NOT_ALLOCED_HUNK_TEST_ID,
  ALLOCED_HUNK_TEST_ID,
} from '@web/design/components/PRFileDiff/PRFileDiff';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { BackendAPI } from '@web/lib/backend/backendApi';
import { GithubRoutePath } from '@web/constants/routes';
import { showAlert } from '@web/lib/alert/alert';
import { logger } from '@web/lib/logger';
import { track } from '@web/lib/analytics/tracking';
import { TrackingEvent } from '@web/lib/analytics/events';

jest.mock('@web/lib/backend/backendApi');
jest.mock('@web/lib/logger');
jest.mock('@web/lib/alert/alert');
jest.mock('@web/lib/analytics/tracking');

const TITLE = '[TICKET-123] Update readme';
const OWNER = 'clintoon';
const REPO_NAME = 'test01';

interface RenderPullRequestSplittingPageOptions {
  splitPREndpointMockFailure?: boolean;
}

interface RenderPullRequestSplittingPageResult {
  renderResult: RenderResult;
  history: MemoryHistory;
}

interface GetPRBranchChip {
  prName: string;
}

const renderPullRequestSplittingPage = ({
  splitPREndpointMockFailure,
}: RenderPullRequestSplittingPageOptions): RenderPullRequestSplittingPageResult => {
  if (splitPREndpointMockFailure) {
    jest
      .spyOn(BackendAPI.prototype, 'splitPullRequest')
      .mockRejectedValue(new Error('splitPullRequest error'));
  } else {
    jest.spyOn(BackendAPI.prototype, 'splitPullRequest').mockResolvedValue({
      splitPullRequestJobId: 'abc123',
    });
  }

  jest.spyOn(BackendAPI.prototype, 'getPullRequestDiff').mockResolvedValue({
    diff: GITHUB_MULTIPLE_FILE_DIFF,
    title: TITLE,
  });

  const initialRoute = '/clintoon/test01/pull/123';
  const history = createMemoryHistory({ initialEntries: [initialRoute] });

  const renderResult = render(
    <Router history={history}>
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
    </Router>
  );

  return { renderResult, history };
};

interface UpdateAddPRTextInputOptions {
  text: string;
}

const updateAddPRTextInput = (
  renderResult: RenderResult,
  { text }: UpdateAddPRTextInputOptions
): void => {
  const controlPanelContainer = renderResult.getByTestId(
    PULL_REQUEST_CONTROL_PANEL_TESTID
  );
  const addPRsSectionContainer = within(controlPanelContainer).getByTestId(
    ADD_PR_SECTION_TESTID
  );
  const addPRsTextInput = within(addPRsSectionContainer).getByTestId(
    TEXT_INPUT_TESTID
  );

  fireEvent.change(addPRsTextInput, {
    target: { value: text },
  });
};

const clickAddPRButton = (renderResult: RenderResult): void => {
  const controlPanelContainer = renderResult.getByTestId(
    PULL_REQUEST_CONTROL_PANEL_TESTID
  );
  const addPRsSectionContainer = within(controlPanelContainer).getByTestId(
    ADD_PR_SECTION_TESTID
  );
  const addPRsButton = within(addPRsSectionContainer).getByTestId(
    BUTTON_TESTID
  );

  fireEvent.click(addPRsButton);
};

const clickEditPRsButton = (renderResult: RenderResult): void => {
  const controlPanelContainer = renderResult.getByTestId(
    PULL_REQUEST_CONTROL_PANEL_TESTID
  );
  const editButtonSection = within(controlPanelContainer).getByTestId(
    EDIT_PRS_SECTION_TESTID
  );

  fireEvent.click(within(editButtonSection).getByTestId(TEXT_BUTTON_TESTID));
};

const getPRBranchChip = (
  container: HTMLElement,
  { prName }: GetPRBranchChip
): HTMLElement => {
  const firstPRBranchChipContainer = within(container)
    .getAllByTestId(CHIP_TESTID)
    .filter((el): boolean => {
      return !!within(el).queryByText(prName);
    })[0];

  return firstPRBranchChipContainer;
};

describe('<PullRequestSplittingPage />', (): void => {
  it('calls the onLoadSplitPRPage tracking event on mount', async (): Promise<
    void
  > => {
    renderPullRequestSplittingPage({});

    await wait((): void => {
      expect(track).toBeCalledWith(TrackingEvent.onLoadSplitPRPage);
    });
  });

  describe('PullRequestInfo', (): void => {
    it('displays PullRequestInfo', async (): Promise<void> => {
      const { renderResult } = renderPullRequestSplittingPage({});
      await wait((): void => {
        expect(renderResult.queryByTestId(PULL_REQUEST_INFO_TESTID)).not.toBe(
          null
        );
      });
    });

    it('displays the PR title', async (): Promise<void> => {
      const { renderResult } = renderPullRequestSplittingPage({});
      await wait((): void => {
        const prInfoContainer = renderResult.getByTestId(
          PULL_REQUEST_INFO_TESTID
        );

        expect(within(prInfoContainer).queryByText(TITLE)).not.toBe(null);
      });
    });

    it('displays the owner  & repoName', async (): Promise<void> => {
      const { renderResult } = renderPullRequestSplittingPage({});
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

  describe('diffs section', (): void => {
    it('displays loading when is loading', async (): Promise<void> => {
      const { renderResult } = renderPullRequestSplittingPage({});

      expect(
        renderResult.queryAllByTestId(PR_SPLITTING_PAGE_LOADING_TESTID)
      ).not.toBe(null);

      await wait();
    });

    it('displays the correct number of file diffs', async (): Promise<void> => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        const diffsSectionContainer = renderResult.getByTestId(
          PR_SPLITTING_PAGE_DIFFS_SECTION_TESTID
        );

        expect(
          within(diffsSectionContainer).queryAllByTestId(
            PR_SPLITTING_PAGE_FILE_DIFF_TESTID
          ).length
        ).toBe(4);
      });
    });
  });

  describe('control panel', (): void => {
    it('adds an PR branch when the TextInput is filled', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        const controlPanelContainer = renderResult.getByTestId(
          PULL_REQUEST_CONTROL_PANEL_TESTID
        );

        updateAddPRTextInput(renderResult, { text: 'PR 1' });
        clickAddPRButton(renderResult);

        expect(
          within(controlPanelContainer).queryAllByTestId(CHIP_TESTID).length
        ).toBe(1);
      });
    });

    it('unfills the add pr TextInput when add pr button is clicked', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        updateAddPRTextInput(renderResult, { text: 'PR 1' });
        clickAddPRButton(renderResult);

        const addPRsSectionContainer = renderResult.getByTestId(
          ADD_PR_SECTION_TESTID
        );
        const addPRsTextInput = within(addPRsSectionContainer).getByTestId(
          TEXT_INPUT_TESTID
        );

        expect(addPRsTextInput.getAttribute('value')).toBe('');
      });
    });

    it('the add PR branch button is disabled when the TextInput is not filled', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        const controlPanelContainer = renderResult.getByTestId(
          PULL_REQUEST_CONTROL_PANEL_TESTID
        );

        clickAddPRButton(renderResult);

        expect(
          within(controlPanelContainer).queryAllByTestId(CHIP_TESTID).length
        ).toBe(0);
      });
    });

    it('goes to edit mode when you click on the edit button when there is a PR branch', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        updateAddPRTextInput(renderResult, { text: 'PR 1' });
        clickAddPRButton(renderResult);

        const editSectionContainer = renderResult.getByTestId(
          EDIT_PRS_SECTION_TESTID
        );

        clickEditPRsButton(renderResult);

        expect(
          within(editSectionContainer).queryByText(EDITING_TEXT_LABEL)
        ).not.toBe(null);
      });
    });

    it('goes to unedit mode when you press the edit button when you are in edit mode when there is a PR branch', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        updateAddPRTextInput(renderResult, { text: 'PR 1' });
        clickAddPRButton(renderResult);

        const editSectionContainer = renderResult.getByTestId(
          EDIT_PRS_SECTION_TESTID
        );

        clickEditPRsButton(renderResult);
        clickEditPRsButton(renderResult);

        expect(
          within(editSectionContainer).queryByText(NOT_EDITING_TEXT_LABEL)
        ).not.toBe(null);
      });
    });

    it('toggle edit mode is disabled when there is no PR branches', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        const editSectionContainer = renderResult.getByTestId(
          EDIT_PRS_SECTION_TESTID
        );

        clickEditPRsButton(renderResult);

        expect(
          within(editSectionContainer).queryByText(NOT_EDITING_TEXT_LABEL)
        ).not.toBe(null);
      });
    });

    it('displays delete buttons on all PR branch chips when in editing mode', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        updateAddPRTextInput(renderResult, { text: 'PR 1' });
        clickAddPRButton(renderResult);

        updateAddPRTextInput(renderResult, { text: 'PR 2' });
        clickAddPRButton(renderResult);

        clickEditPRsButton(renderResult);

        const controlPanelContainer = renderResult.getByTestId(
          PULL_REQUEST_CONTROL_PANEL_TESTID
        );

        expect(
          within(controlPanelContainer).queryAllByTestId(
            CHIP_DELETE_BUTTON_TESTID
          ).length
        ).toBe(0);
      });
    });

    it('clicking on the PR branch delete button deletes the PR', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        updateAddPRTextInput(renderResult, { text: 'PR 1' });
        clickAddPRButton(renderResult);

        updateAddPRTextInput(renderResult, { text: 'PR 2' });
        clickAddPRButton(renderResult);

        clickEditPRsButton(renderResult);
      });

      const controlPanelContainer = renderResult.getByTestId(
        PULL_REQUEST_CONTROL_PANEL_TESTID
      );

      const firstPRBranchChipContainer = getPRBranchChip(
        controlPanelContainer,
        {
          prName: 'PR 1',
        }
      );

      fireEvent.click(
        within(firstPRBranchChipContainer).getByTestId(
          CHIP_DELETE_BUTTON_TESTID
        )
      );

      expect(within(controlPanelContainer).queryByText('PR 1')).toBe(null);
    });

    it('clicking on an PR branch selects it when not in edit mode', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        updateAddPRTextInput(renderResult, { text: 'PR 1' });
        clickAddPRButton(renderResult);

        updateAddPRTextInput(renderResult, { text: 'PR 2' });
        clickAddPRButton(renderResult);

        const controlPanelContainer = renderResult.getByTestId(
          PULL_REQUEST_CONTROL_PANEL_TESTID
        );

        const firstPRBranchChipContainer = getPRBranchChip(
          controlPanelContainer,
          {
            prName: 'PR 1',
          }
        );

        fireEvent.click(firstPRBranchChipContainer);

        const selectedPRChipContainer = within(
          controlPanelContainer
        ).getByTestId(SELECTED_PR_CHIP_TESTID);

        expect(within(selectedPRChipContainer).queryByText('PR 1')).not.toBe(
          null
        );
      });
    });

    it('clicking on an PR branch does not select it when in edit mode', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        updateAddPRTextInput(renderResult, { text: 'PR 1' });
        clickAddPRButton(renderResult);

        clickEditPRsButton(renderResult);

        const controlPanelContainer = renderResult.getByTestId(
          PULL_REQUEST_CONTROL_PANEL_TESTID
        );

        fireEvent.click(within(controlPanelContainer).getByTestId(CHIP_TESTID));

        expect(
          within(controlPanelContainer).queryByTestId(SELECTED_PR_CHIP_TESTID)
        ).toBe(null);
      });
    });

    it('selecting an PR branch unselects the other selected PR branch', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        updateAddPRTextInput(renderResult, { text: 'PR 1' });
        clickAddPRButton(renderResult);

        updateAddPRTextInput(renderResult, { text: 'PR 2' });
        clickAddPRButton(renderResult);

        const controlPanelContainer = renderResult.getByTestId(
          PULL_REQUEST_CONTROL_PANEL_TESTID
        );
        const firstPRBranchChipContainer = getPRBranchChip(
          controlPanelContainer,
          {
            prName: 'PR 1',
          }
        );

        fireEvent.click(firstPRBranchChipContainer);

        const secondPRBranchChipContainer = getPRBranchChip(
          controlPanelContainer,
          {
            prName: 'PR 2',
          }
        );

        fireEvent.click(secondPRBranchChipContainer);

        const selectedPRBranchContainer = within(
          controlPanelContainer
        ).getByTestId(SELECTED_PR_CHIP_TESTID);

        expect(within(selectedPRBranchContainer).queryByText('PR 2')).not.toBe(
          null
        );
      });
    });

    it('unselects the current PR branch if you click on it', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait((): void => {
        updateAddPRTextInput(renderResult, { text: 'PR 1' });
        clickAddPRButton(renderResult);

        const controlPanelContainer = renderResult.getByTestId(
          PULL_REQUEST_CONTROL_PANEL_TESTID
        );

        fireEvent.click(within(controlPanelContainer).getByTestId(CHIP_TESTID));
        fireEvent.click(within(controlPanelContainer).getByTestId(CHIP_TESTID));

        expect(
          within(controlPanelContainer).queryByTestId(SELECTED_PR_CHIP_TESTID)
        ).toBe(null);
      });
    });
  });

  describe('allocating hunks to PRs', (): void => {
    it('allocates an hunk when an hunk is clicked and a pr branch is selected', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});
      await wait();

      updateAddPRTextInput(renderResult, { text: 'PR 1' });
      clickAddPRButton(renderResult);

      const controlPanelContainer = renderResult.getByTestId(
        PULL_REQUEST_CONTROL_PANEL_TESTID
      );
      fireEvent.click(within(controlPanelContainer).getByTestId(CHIP_TESTID));

      fireEvent.click(renderResult.getAllByTestId(NOT_ALLOCED_HUNK_TEST_ID)[0]);

      expect(renderResult.queryByTestId(ALLOCED_HUNK_TEST_ID)).not.toBe(null);
    });

    it('does not allocate an hunk when a hunk is clicked and a pr branch is not selected', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});

      await wait();

      fireEvent.click(renderResult.getAllByTestId(NOT_ALLOCED_HUNK_TEST_ID)[0]);

      expect(renderResult.queryByTestId(ALLOCED_HUNK_TEST_ID)).toBe(null);
    });

    it('removes the allocated hunk of a pr branch if it is deleted', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});
      await wait();

      updateAddPRTextInput(renderResult, { text: 'PR 1' });
      clickAddPRButton(renderResult);

      const controlPanelContainer = renderResult.getByTestId(
        PULL_REQUEST_CONTROL_PANEL_TESTID
      );
      fireEvent.click(within(controlPanelContainer).getByTestId(CHIP_TESTID));

      fireEvent.click(renderResult.getAllByTestId(NOT_ALLOCED_HUNK_TEST_ID)[0]);

      clickEditPRsButton(renderResult);
      const chipDeleteButtonContainer = within(
        controlPanelContainer
      ).getByTestId(CHIP_DELETE_BUTTON_TESTID);

      fireEvent.click(chipDeleteButtonContainer);

      expect(renderResult.queryByTestId(ALLOCED_HUNK_TEST_ID)).toBe(null);
    });

    it('unallocates an hunk if you click the hunk when in unselected mode', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({});
      await wait();

      updateAddPRTextInput(renderResult, { text: 'PR 1' });
      clickAddPRButton(renderResult);

      const controlPanelContainer = renderResult.getByTestId(
        PULL_REQUEST_CONTROL_PANEL_TESTID
      );
      const prChipContainer = within(controlPanelContainer).getByTestId(
        CHIP_TESTID
      );
      fireEvent.click(prChipContainer);

      fireEvent.click(renderResult.getAllByTestId(NOT_ALLOCED_HUNK_TEST_ID)[0]);

      fireEvent.click(prChipContainer);

      fireEvent.click(renderResult.getByTestId(ALLOCED_HUNK_TEST_ID));

      expect(renderResult.queryByTestId(ALLOCED_HUNK_TEST_ID)).toBe(null);
    });

    // TODO(clinton): Test that you can allocate hunks to separate PRs using screenshot testing.
  });

  describe('splitting the pr', (): void => {
    it('successfully splits the PR when you press the split button with allocated hunks', async (): Promise<
      void
    > => {
      // allocate the hunk
      const { renderResult, history } = renderPullRequestSplittingPage({
        splitPREndpointMockFailure: false,
      });
      await wait();

      updateAddPRTextInput(renderResult, { text: 'PR 1' });
      clickAddPRButton(renderResult);

      const controlPanelContainer = renderResult.getByTestId(
        PULL_REQUEST_CONTROL_PANEL_TESTID
      );
      fireEvent.click(within(controlPanelContainer).getByTestId(CHIP_TESTID));

      fireEvent.click(renderResult.getAllByTestId(NOT_ALLOCED_HUNK_TEST_ID)[0]);

      // split the PR
      const splitPRButtonContainer = within(
        renderResult.getByTestId(SPLIT_PR_BUTTON_SECTION_TESTID)
      ).getByTestId(BUTTON_TESTID);
      fireEvent.click(splitPRButtonContainer);

      await wait((): void => {
        expect(history.location.pathname).toBe(GithubRoutePath.AppRoot);
        expect(showAlert as jest.Mock).toBeCalledWith(
          'An job to split the PR was added to the queue. Please wait for the pull requests to be created in the github repo.'
        );
        expect(track).toHaveBeenCalledWith(TrackingEvent.onSplitPRSuccess);
      });
    });

    it('promps the user when you press the split button without any allocated hunks', async (): Promise<
      void
    > => {
      const { renderResult } = renderPullRequestSplittingPage({
        splitPREndpointMockFailure: false,
      });
      await wait();

      const splitPRButtonContainer = within(
        renderResult.getByTestId(SPLIT_PR_BUTTON_SECTION_TESTID)
      ).getByTestId(BUTTON_TESTID);
      fireEvent.click(splitPRButtonContainer);

      expect(showAlert as jest.Mock).toBeCalledWith(
        'You must allocate at least one hunk to an PR before you can split the PR.'
      );
    });

    it('promps the user and logs an error when the endpoint fails', async (): Promise<
      void
    > => {
      // allocate the hunk
      const { renderResult } = renderPullRequestSplittingPage({
        splitPREndpointMockFailure: true,
      });
      await wait();

      updateAddPRTextInput(renderResult, { text: 'PR 1' });
      clickAddPRButton(renderResult);

      const controlPanelContainer = renderResult.getByTestId(
        PULL_REQUEST_CONTROL_PANEL_TESTID
      );
      fireEvent.click(within(controlPanelContainer).getByTestId(CHIP_TESTID));

      fireEvent.click(renderResult.getAllByTestId(NOT_ALLOCED_HUNK_TEST_ID)[0]);

      // split the PR
      const splitPRButtonContainer = within(
        renderResult.getByTestId(SPLIT_PR_BUTTON_SECTION_TESTID)
      ).getByTestId(BUTTON_TESTID);
      fireEvent.click(splitPRButtonContainer);

      await wait((): void => {
        expect(showAlert as jest.Mock).toBeCalledWith(
          'Unable to split PR. Please try again.'
        );
        expect(logger.info).toBeCalledWith(
          'Unable to split PR Error: splitPullRequest error'
        );
      });
    });
  });
});
