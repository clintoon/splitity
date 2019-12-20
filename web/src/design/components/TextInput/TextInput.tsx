import React from 'react';
import styled from 'styled-components';

const TEXT_INPUT_TESTID = 'text input';

const Input = styled.input`
  height: 22px;
  padding: 4px;
`;

interface TextInputProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ value, onChange }: TextInputProps): JSX.Element => {
  return (
    <Input
      data-testid={TEXT_INPUT_TESTID}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};

export { TextInput, TEXT_INPUT_TESTID };
