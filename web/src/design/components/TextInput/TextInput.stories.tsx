import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { TextInput } from '@web/design/components/TextInput/TextInput';

const StoryTextInput = (): JSX.Element => {
  const [value, setValue] = useState();
  return (
    <TextInput
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
      }}
    />
  );
};

storiesOf('TextInput', module).add(
  'Documentation',
  (): JSX.Element => <StoryTextInput />
);
