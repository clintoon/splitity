import React from 'react';
import { render, RenderResult, fireEvent, wait } from '@testing-library/react';
import { Chip, CHIP_TESTID } from '@web/design/components/Chip/Chip';

interface RenderChipOptions {
  onClick?: () => void;
  onDelete?: () => void;
}

interface RenderChipResult {
  renderResult: RenderResult;
}

const renderChip = (options: RenderChipOptions): RenderChipResult => {
  const renderResult = render(
    <Chip onClick={options.onClick} onDelete={options.onDelete} label="hello" />
  );

  return { renderResult };
};

describe('<Chip/>', (): void => {
  it('calls onClick when clicking the chip', (): void => {
    const onClickMock = jest.fn();

    const { renderResult } = renderChip({
      onClick: onClickMock,
      onDelete: undefined,
    });

    fireEvent.click(renderResult.getByTestId(CHIP_TESTID));

    expect(onClickMock).toBeCalled();
  });
});
