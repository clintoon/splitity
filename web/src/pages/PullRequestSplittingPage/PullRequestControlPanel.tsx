import React, { useState } from 'react';
import styled from 'styled-components';
import { TextInput } from '@web/design/components/TextInput/TextInput';
import {
  ButtonStyle,
  Button,
  ButtonSize,
} from '@web/design/components/Button/Button';
import { Color } from '@web/design/styles/color';
import {
  TextButton,
  TextButtonStyle,
  TextButtonSize,
} from '@web/design/components/Button/TextButton';
import { ChipArray } from '@web/design/components/Chip/ChipArray';
import { PRBranchData } from './PullRequestSplittingPage';
import { Chip } from '@web/design/components/Chip/Chip';
import { TextWeight } from '@web/design/components/Text/Text';

const EDITING_TEXT_LABEL = 'Stop editing';
const NOT_EDITING_TEXT_LABEL = 'Edit';

const PULL_REQUEST_CONTROL_PANEL_TESTID = 'pull request control panel';
const SELECTED_PR_CHIP_TESTID = 'pull request control panel selected pr chip';
const ADD_PR_SECTION_TESTID = 'add pr section';
const EDIT_PRS_SECTION_TESTID = 'edit prs section';
const SPLIT_PR_BUTTON_SECTION_TESTID = 'split pr button section';

interface PullRequestControlPanelProps {
  selectedPRBranch: number | null;
  prCollection: PRBranchData[];
  onAddPRClick: (PRName: string) => void;
  onDeletePRClick: (prId: number) => void;
  onSelectPR: (prId: number) => void;
  onSplitPR: () => void;
}

const Container = styled.div`
  position: sticky;
  top: 20px;
  min-width: 330px;
  max-width: 330px;
  height: 400px;
  background-color: ${Color.White};
  border-radius: 10px;
  padding: 30px;
`;

const ButtonRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const AddPRSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  margin: 0 0 20px 0;
`;

const AddPRTextInput = styled(TextInput)`
  flex-grow: 1;
  margin: 0 4px 0 0;
`;

const EnhancedChipArray = styled(ChipArray)`
  max-height: 250px;
  margin: 0 0 20px 0;
`;

const PullRequestControlPanel = ({
  selectedPRBranch,
  prCollection,
  onAddPRClick,
  onDeletePRClick,
  onSelectPR,
  onSplitPR,
}: PullRequestControlPanelProps): JSX.Element => {
  const [branchInputValue, setBranchInputValue] = useState<string>('');
  const [isEditingPRs, setIsEditingPRs] = useState<boolean>(false);

  const onAddPrClickHandler = (): void => {
    onAddPRClick(branchInputValue);
    setBranchInputValue('');
  };

  const toggleEditMode = (): void => {
    setIsEditingPRs(!isEditingPRs);
  };

  const isSelectedPRChip = (prData: PRBranchData): boolean => {
    return prData.id === selectedPRBranch;
  };

  return (
    <Container data-testid={PULL_REQUEST_CONTROL_PANEL_TESTID}>
      <AddPRSection data-testid={ADD_PR_SECTION_TESTID}>
        <AddPRTextInput
          value={branchInputValue}
          onChange={(event): void => {
            setBranchInputValue(event.target.value);
          }}
          placeholder="Pull request title"
        />
        <Button
          size={ButtonSize.Small}
          styleOf={ButtonStyle.Secondary}
          disabled={branchInputValue === ''}
          onClick={onAddPrClickHandler}
        >
          Add PR
        </Button>
      </AddPRSection>
      <ButtonRightContainer data-testid={EDIT_PRS_SECTION_TESTID}>
        <TextButton
          size={TextButtonSize.Small}
          styleOf={TextButtonStyle.Secondary}
          onClick={toggleEditMode}
          disabled={prCollection.length === 0}
        >
          {isEditingPRs ? EDITING_TEXT_LABEL : NOT_EDITING_TEXT_LABEL}
        </TextButton>
      </ButtonRightContainer>
      <EnhancedChipArray>
        {prCollection.map(
          (prData): JSX.Element => {
            return (
              <span
                key={prData.id}
                data-testid={
                  isSelectedPRChip(prData) ? SELECTED_PR_CHIP_TESTID : undefined
                }
              >
                <Chip
                  label={prData.name}
                  borderColor={prData.color}
                  onDelete={
                    isEditingPRs
                      ? (): void => {
                          onDeletePRClick(prData.id);
                        }
                      : undefined
                  }
                  onClick={
                    !isEditingPRs
                      ? (): void => {
                          onSelectPR(prData.id);
                        }
                      : undefined
                  }
                  fontWeight={
                    isSelectedPRChip(prData) ? TextWeight.Bold : undefined
                  }
                />
              </span>
            );
          }
        )}
      </EnhancedChipArray>
      <ButtonRightContainer data-testid={SPLIT_PR_BUTTON_SECTION_TESTID}>
        <Button styleOf={ButtonStyle.Primary} onClick={onSplitPR}>
          Split
        </Button>
      </ButtonRightContainer>
    </Container>
  );
};

export {
  PullRequestControlPanel,
  EDITING_TEXT_LABEL,
  NOT_EDITING_TEXT_LABEL,
  PULL_REQUEST_CONTROL_PANEL_TESTID,
  SELECTED_PR_CHIP_TESTID,
  ADD_PR_SECTION_TESTID,
  EDIT_PRS_SECTION_TESTID,
  SPLIT_PR_BUTTON_SECTION_TESTID,
};
