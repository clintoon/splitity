import React from 'react';
import { logException } from '@web/lib/logger';
import { UnexpectedErrorPage } from '@web/pages/UnexpectedErrorPage/UnexpectedErrorPage';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return <UnexpectedErrorPage />;
    }

    return this.props.children;
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logException(error, { errorInfo });
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
}

export { ErrorBoundary };
