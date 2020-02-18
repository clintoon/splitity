import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { UNEXPECTED_ERROR_PAGE_TESTID } from '@web/pages/UnexpectedErrorPage/UnexpectedErrorPage';

const RENDERS_CHILD_TESTID = 'renders child';

const ThrowError = (): null => {
  throw new Error('💣');
};

describe('<ErrorBoundary/>', (): void => {
  it('renders the child is there is no error', (): void => {
    const renderResult = render(
      <ErrorBoundary>
        <div data-testid={RENDERS_CHILD_TESTID} />
      </ErrorBoundary>
    );

    expect(renderResult.queryByTestId(RENDERS_CHILD_TESTID)).not.toBe(null);
  });

  it('renders the error is there is unhandled exception', (): void => {
    // Mocking console.error to not dump error to console
    const consoleErrSpy = jest.spyOn(console, 'error');
    consoleErrSpy.mockImplementation((): void => {});

    const renderResult = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(renderResult.queryByTestId(UNEXPECTED_ERROR_PAGE_TESTID)).not.toBe(
      null
    );

    consoleErrSpy.mockRestore();
  });
});
