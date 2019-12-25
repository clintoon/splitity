import React from 'react';
import {
  TextButton,
  TextButtonStyle,
  TEXT_BUTTON_TESTID,
} from '@web/design/components/Button/TextButton';
import {
  render,
  RenderResult,
  within,
  fireEvent,
} from '@testing-library/react';

const LABEL = 'label';

interface RenderOutlineOptions {
  disabled?: boolean;
}

interface RenderTextButtonResult {
  renderResult: RenderResult;
  onClickMock: jest.Mock;
}

const renderTextButton = ({
  disabled,
}: RenderOutlineOptions): RenderTextButtonResult => {
  const onClickMock = jest.fn();
  const renderResult = render(
    <TextButton
      styleOf={TextButtonStyle.Primary}
      onClick={onClickMock}
      disabled={disabled}
    >
      {LABEL}
    </TextButton>
  );

  return { renderResult, onClickMock };
};

describe('<TextButton/>', (): void => {
  it('displays label', (): void => {
    const { renderResult } = renderTextButton({});
    const textButtonContainer = renderResult.getByTestId(TEXT_BUTTON_TESTID);
    expect(within(textButtonContainer).queryByText(LABEL)).not.toBe(null);
  });

  it('calls onClick handler when clicked', (): void => {
    const { renderResult, onClickMock } = renderTextButton({});
    const textButtonContainer = renderResult.getByTestId(TEXT_BUTTON_TESTID);

    fireEvent.click(textButtonContainer);
    expect(onClickMock).toBeCalled();
  });

  it('does not trigger onClick on click when is disabled', (): void => {
    const { renderResult, onClickMock } = renderTextButton({
      disabled: true,
    });

    fireEvent.click(renderResult.getByTestId(TEXT_BUTTON_TESTID));

    expect(onClickMock).not.toHaveBeenCalled();
  });
});
