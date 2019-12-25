import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  within,
} from '@testing-library/react';
import {
  Chip,
  CHIP_TESTID,
  CHIP_DELETE_BUTTON_TESTID,
} from '@web/design/components/Chip/Chip';
import { TextWeight } from '@web/design/components/Text/Text';

const LABEL = 'label123';

interface RenderChipOptions {
  onClick?: () => void;
  onDelete?: () => void;
  fontWeight?: TextWeight;
}

interface RenderChipResult {
  renderResult: RenderResult;
}

const renderChip = (options: RenderChipOptions): RenderChipResult => {
  const renderResult = render(
    <Chip
      onClick={options.onClick}
      onDelete={options.onDelete}
      fontWeight={options.fontWeight}
      label={LABEL}
    />
  );

  return { renderResult };
};

describe('<Chip/>', (): void => {
  it('displays label', (): void => {
    const { renderResult } = renderChip({});
    const chipContainer = renderResult.getByTestId(CHIP_TESTID);
    expect(within(chipContainer).queryByText(LABEL)).not.toBe(null);
  });

  it('displays label when is bold', (): void => {
    const { renderResult } = renderChip({ fontWeight: TextWeight.Bold });
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

  it('does not display delete button if onDelete is not passed in', (): void => {
    const { renderResult } = renderChip({});
    expect(renderResult.queryByTestId(CHIP_DELETE_BUTTON_TESTID)).toBe(null);
  });

  it('calls onDelete when clicking the delete button on chip', (): void => {
    const onDeleteMock = jest.fn();

    const { renderResult } = renderChip({
      onDelete: onDeleteMock,
    });

    fireEvent.click(renderResult.getByTestId(CHIP_DELETE_BUTTON_TESTID));

    expect(onDeleteMock).toBeCalled();
  });
});
