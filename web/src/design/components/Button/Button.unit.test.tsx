import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import {
  Button,
  ButtonStyle,
  BUTTON_TESTID,
} from '@web/design/components/Button/Button';

const BUTTON_LABEL = 'label';

interface RenderButton {
  styleOf: ButtonStyle;
  disabled?: boolean;
}

interface RenderButtonResult {
  renderResult: RenderResult;
  onClickMock: jest.Mock;
}

const renderButton = ({
  styleOf,
  disabled,
}: RenderButton): RenderButtonResult => {
  const onClickMock = jest.fn();
  const renderResult = render(
    <Button styleOf={styleOf} onClick={onClickMock} disabled={disabled}>
      {BUTTON_LABEL}
    </Button>
  );
  return {
    onClickMock,
    renderResult,
  };
};

describe('<Button/>', (): void => {
  it('renders the button label', (): void => {
    const { renderResult } = renderButton({ styleOf: ButtonStyle.Primary });
    expect(renderResult.getByTestId(BUTTON_TESTID)).toHaveTextContent(
      BUTTON_LABEL
    );
  });

  it('calls onClick prop when button is clicked', (): void => {
    const { renderResult, onClickMock } = renderButton({
      styleOf: ButtonStyle.Primary,
    });

    fireEvent.click(renderResult.getByTestId(BUTTON_TESTID));

    expect(onClickMock).toHaveBeenCalled();
  });

  it('does not call onClick prop when not clicked', (): void => {
    const { onClickMock } = renderButton({
      styleOf: ButtonStyle.Primary,
    });

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('does not trigger onClick on click when is disabled', (): void => {
    const { renderResult, onClickMock } = renderButton({
      styleOf: ButtonStyle.Primary,
      disabled: true,
    });

    fireEvent.click(renderResult.getByTestId(BUTTON_TESTID));

    expect(onClickMock).not.toHaveBeenCalled();
  });
});
