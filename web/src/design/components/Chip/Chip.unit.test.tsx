import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  within,
} from '@testing-library/react';
import { Chip, CHIP_TESTID } from '@web/design/components/Chip/Chip';

const LABEL = 'label123';

interface RenderChipOptions {
  onClick?: () => void;
  onDelete?: () => void;
}

interface RenderChipResult {
  renderResult: RenderResult;
}

const renderChip = (options: RenderChipOptions): RenderChipResult => {
  const renderResult = render(
    <Chip onClick={options.onClick} onDelete={options.onDelete} label={LABEL} />
  );

  return { renderResult };
};

describe('<Chip/>', (): void => {
  it('displays label', (): void => {
    const { renderResult } = renderChip({});
    const chipContainer = renderResult.getByTestId(CHIP_TESTID);
    expect(within(chipContainer).queryByText(LABEL)).not.toBe(null);
  });

  it('calls onClick when clicking the chip', (): void => {
    const onClickMock = jest.fn();

    const { renderResult } = renderChip({
      onClick: onClickMock,
    });

    fireEvent.click(renderResult.getByTestId(CHIP_TESTID));

    expect(onClickMock).toBeCalled();
  });
});
