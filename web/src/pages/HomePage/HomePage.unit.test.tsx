import React from 'react';
import { HomePage } from '@web/pages/HomePage/HomePage';
import { HERO_TESTID } from '@web/design/components/Hero/Hero';
import { render, within, fireEvent } from '@testing-library/react';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';
import { handleSignIn } from '@web/lib/eventHandlers/auth';

jest.mock('@web/lib/eventHandlers/auth');
jest.mock('react-player');

describe('<HomePage/>', (): void => {
  it('renders <Hero/>', (): void => {
    const { queryByTestId } = render(<HomePage />);
    expect(queryByTestId(HERO_TESTID)).not.toBe(null);
  });

  it('hero button calls handleSignIn when clicked', (): void => {
    const { getByTestId } = render(<HomePage />);

    fireEvent.click(
      within(getByTestId(HERO_TESTID)).getByTestId(BUTTON_TESTID)
    );

    expect(handleSignIn).toHaveBeenCalled();
  });
});
