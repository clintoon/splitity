import React from 'react';
import { render } from '@testing-library/react';
import { ChipArray } from './ChipArray';
import _ from 'lodash';
import { Chip, CHIP_TESTID } from './Chip';

describe('<ChipArray />', (): void => {
  it('renders the chips', (): void => {
    const renderResult = render(
      <ChipArray>
        {_.range(0, 8).map(
          (val): JSX.Element => {
            return <Chip key={val} label={`chip ${val}`} />;
          }
        )}
      </ChipArray>
    );

    expect(renderResult.queryAllByTestId(CHIP_TESTID).length).toBe(8);
  });
});
