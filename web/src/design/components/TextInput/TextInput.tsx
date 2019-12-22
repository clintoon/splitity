import React from 'react';
import styled from 'styled-components';

const TEXT_INPUT_TESTID = 'text input';

const Input = styled.input`
  padding: 4px;
`;

interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}

const TextInput = ({
  value,
  onChange,
  className,
  placeholder,
}: TextInputProps): JSX.Element => {
  return (
    <Input
      className={className}
      data-testid={TEXT_INPUT_TESTID}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export { TextInput, TEXT_INPUT_TESTID };
