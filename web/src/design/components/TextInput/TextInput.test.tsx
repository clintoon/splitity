import React from 'react';
import {
  TextInput,
  TEXT_INPUT_TESTID,
} from '@web/design/components/TextInput/TextInput';
import {
  render,
  RenderResult,
  fireEvent,
  wait,
  waitForDomChange,
} from '@testing-library/react';

interface RenderTextInputResult {
  renderResult: RenderResult;
  onChangeMock: jest.Mock;
}

interface RenderTextInputOptions {
  value: string;
  placeholder?: string;
}

const renderTextInput = ({
  value,
  placeholder,
}: RenderTextInputOptions): RenderTextInputResult => {
  const onChangeMock = jest.fn();

  const renderResult = render(
    <TextInput
      value={value}
      placeholder={placeholder}
      onChange={onChangeMock}
    />
  );

  return { renderResult, onChangeMock };
};

describe('<TextInput />', (): void => {
  it('has the correct type attribute', (): void => {
    const { renderResult } = renderTextInput({ value: '' });
    expect(
      renderResult.getByTestId(TEXT_INPUT_TESTID).getAttribute('type')
    ).toBe('text');
  });

  it('has the correct value attribute', (): void => {
    const { renderResult } = renderTextInput({ value: 'potato' });
    expect(
      renderResult.getByTestId(TEXT_INPUT_TESTID).getAttribute('value')
    ).toBe('potato');
  });

  it('typing triggers onChange', async (): Promise<void> => {
    const { renderResult, onChangeMock } = renderTextInput({ value: '' });
    fireEvent.change(renderResult.getByTestId(TEXT_INPUT_TESTID), {
      target: { value: 'h' },
    });

    expect(onChangeMock).toBeCalled();
  });

  it('has placeholder attribute when placeholder prop is passed in', (): void => {
    const { renderResult } = renderTextInput({
      value: '',
      placeholder: 'placeholder123',
    });

    expect(
      renderResult.getByTestId(TEXT_INPUT_TESTID).getAttribute('placeholder')
    ).toBe('placeholder123');
  });
});
