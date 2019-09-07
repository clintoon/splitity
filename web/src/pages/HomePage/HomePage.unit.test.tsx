import React from 'react';
import { HomePage } from '@web/pages/HomePage/HomePage';
import { HERO_TESTID } from '@web/design/components/Hero/Hero';
import { render } from '@testing-library/react';

describe('<HomePage/>', (): void => {
  it('renders <Hero/>', (): void => {
    const { queryByTestId } = render(<HomePage />);
    expect(queryByTestId(HERO_TESTID)).not.toBe(null);
  });
});
