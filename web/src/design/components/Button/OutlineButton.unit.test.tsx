import React from 'react';
import {
  OutlineButton,
  OutlineButtonStyle,
  OUTLINE_BUTTON_TESTID,
} from '@web/design/components/Button/OutlineButton';
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

interface RenderOutlineButtonResult {
  renderResult: RenderResult;
  onClickMock: jest.Mock;
}

const renderOutlineButton = ({
  disabled,
}: RenderOutlineOptions): RenderOutlineButtonResult => {
  const onClickMock = jest.fn();
  const renderResult = render(
    <OutlineButton
      styleOf={OutlineButtonStyle.Primary}
      onClick={onClickMock}
      disabled={disabled}
    >
      {LABEL}
    </OutlineButton>
  );

  return { renderResult, onClickMock };
};

describe('<OutlineButton/>', (): void => {
  it('displays label', (): void => {
    const { renderResult } = renderOutlineButton({});
    const outlineButtonContainer = renderResult.getByTestId(
      OUTLINE_BUTTON_TESTID
    );
    expect(within(outlineButtonContainer).queryByText(LABEL)).not.toBe(null);
  });

  it('calls onClick handler when clicked', (): void => {
    const { renderResult, onClickMock } = renderOutlineButton({});
    const outlineButtonContainer = renderResult.getByTestId(
      OUTLINE_BUTTON_TESTID
    );

    fireEvent.click(outlineButtonContainer);
    expect(onClickMock).toBeCalled();
  });

  it('does not trigger onClick on click when is disabled', (): void => {
    const { renderResult, onClickMock } = renderOutlineButton({
      disabled: true,
    });

    fireEvent.click(renderResult.getByTestId(OUTLINE_BUTTON_TESTID));

    expect(onClickMock).not.toHaveBeenCalled();
  });
});
