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

interface PullRequestControlPanelProps {
  selectedPRBranch: number | null;
  prCollection: PRBranchData[];
  onAddPRClick: (PRName: string) => void;
  onDeletePRClick: (prId: number) => void;
  onSelectPR: (prId: number) => void;
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

  return (
    <Container>
      <AddPRSection>
        <AddPRTextInput
          value={branchInputValue}
          onChange={(event): void => {
            setBranchInputValue(event.target.value);
          }}
          placeholder="A name, something short"
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
      <ButtonRightContainer>
        <TextButton
          size={TextButtonSize.Small}
          styleOf={TextButtonStyle.Secondary}
          onClick={toggleEditMode}
          disabled={prCollection.length === 0}
        >
          {isEditingPRs ? 'Stop editing' : 'Edit'}
        </TextButton>
      </ButtonRightContainer>
      <EnhancedChipArray>
        {prCollection.map(
          (prData): JSX.Element => {
            return (
              <Chip
                label={prData.name}
                key={prData.id}
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
                  selectedPRBranch === prData.id ? TextWeight.Bold : undefined
                }
              />
            );
          }
        )}
      </EnhancedChipArray>
      <ButtonRightContainer>
        <Button styleOf={ButtonStyle.Primary}>Split</Button>
      </ButtonRightContainer>
    </Container>
  );
};

export { PullRequestControlPanel };
