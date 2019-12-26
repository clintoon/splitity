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
import { GithubAPI } from '@web/lib/github/github';
import { GITHUB_MULTIPLE_FILE_DIFF } from '@web/testing/fixtures/pullRequestDiff';
import {
  PULL_REQUEST_CONTROL_PANEL_TESTID,
  ADD_PR_SECTION_TESTID,
  EDIT_PRS_SECTION_TESTID,
  EDITING_TEXT_LABEL,
  NOT_EDITING_TEXT_LABEL,
  SELECTED_PR_CHIP_TESTID,
} from './PullRequestControlPanel';
import {
  CHIP_TESTID,
  CHIP_DELETE_BUTTON_TESTID,
} from '@web/design/components/Chip/Chip';
import { TEXT_INPUT_TESTID } from '@web/design/components/TextInput/TextInput';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';
import { TEXT_BUTTON_TESTID } from '@web/design/components/Button/TextButton';

jest.mock('@web/lib/github/github');

const TITLE = '[TICKET-123] Update readme';
const OWNER = 'clintoon';
const REPO_NAME = 'test01';

interface RenderPullRequestSplittingPageResult {
  renderResult: RenderResult;
}

interface GetPRBranchChip {
  prName: string;
}

const renderPullRequestSplittingPage = (): RenderPullRequestSplittingPageResult => {
  jest.spyOn(GithubAPI.prototype, 'getPullRequestInfo').mockResolvedValue({
    title: TITLE,
  });

  jest
    .spyOn(GithubAPI.prototype, 'getPullRequestDiff')
    .mockResolvedValue(GITHUB_MULTIPLE_FILE_DIFF);

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

  describe('diffs section', (): void => {
    it('displays loading when is loading', async (): Promise<void> => {
      const { renderResult } = renderPullRequestSplittingPage();

      expect(
        renderResult.queryAllByTestId(PR_SPLITTING_PAGE_LOADING_TESTID)
      ).not.toBe(null);

      await wait();
    });

    it('displays the correct number of file diffs', async (): Promise<void> => {
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
      const { renderResult } = renderPullRequestSplittingPage();

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
});
