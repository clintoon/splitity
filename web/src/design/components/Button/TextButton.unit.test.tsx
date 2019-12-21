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

interface RenderTextButtonResult {
  renderResult: RenderResult;
  onClickMock: jest.Mock;
}

const renderTextButton = (): RenderTextButtonResult => {
  const onClickMock = jest.fn();
  const renderResult = render(
    <TextButton styleOf={TextButtonStyle.Primary} onClick={onClickMock}>
      {LABEL}
    </TextButton>
  );

  return { renderResult, onClickMock };
};

describe('<TextButton/>', (): void => {
  it('displays label', (): void => {
    const { renderResult } = renderTextButton();
    const textButtonContainer = renderResult.getByTestId(TEXT_BUTTON_TESTID);
    expect(within(textButtonContainer).queryByText(LABEL)).not.toBe(null);
  });

  it('calls onClick handler when clicked', (): void => {
    const { renderResult, onClickMock } = renderTextButton();
    const textButtonContainer = renderResult.getByTestId(TEXT_BUTTON_TESTID);

    fireEvent.click(textButtonContainer);
    expect(onClickMock).toBeCalled();
  });
});
