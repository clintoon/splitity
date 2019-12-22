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
import { noop } from 'lodash';
import { ChipArray } from '@web/design/components/Chip/ChipArray';
import { PRBranchData } from './PullRequestSplittingPage';
import { Chip } from '@web/design/components/Chip/Chip';

interface PullRequestControlPanelProps {
  onAddPRClick: (PRName: string) => void;
  prCollection: PRBranchData[];
}

const Container = styled.div`
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
  onAddPRClick,
  prCollection,
}: PullRequestControlPanelProps): JSX.Element => {
  const [branchInputValue, setBranchInputValue] = useState<string>('');

  return (
    <Container>
      <AddPRSection>
        <AddPRTextInput
          value={branchInputValue}
          onChange={(event): void => {
            setBranchInputValue(event.target.value);
          }}
          placeholder="Short PR name"
        />
        <Button
          size={ButtonSize.Small}
          styleOf={ButtonStyle.Secondary}
          disabled={branchInputValue === ''}
          onClick={(): void => {
            onAddPRClick(branchInputValue);
            setBranchInputValue('');
          }}
        >
          Add PR
        </Button>
      </AddPRSection>
      <ButtonRightContainer>
        <TextButton
          size={TextButtonSize.Small}
          styleOf={TextButtonStyle.Secondary}
          onClick={noop}
          disabled={prCollection.length === 0}
        >
          Edit
        </TextButton>
      </ButtonRightContainer>
      <EnhancedChipArray>
        {prCollection.map(
          (prData): JSX.Element => {
            return <Chip label={prData.name} key={prData.id} />;
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
