import React from 'react';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { PageContent } from '@web/components/PageContent';
import { useStore } from '@web/stores/useStore';
import { withRouter, RouteComponentProps } from 'react-router';
import { useSignInRedirectResult } from '@web/hooks/useSignInRedirectResult';
import { useSyncUserStore } from '@web/hooks/useSyncUserStore';
import { useNotAuthRedirect } from '@web/hooks/useNotAuthRedirect';

const WrappedApp = ({ history }: RouteComponentProps): JSX.Element => {
  const store = useStore();

  useSyncUserStore(store);
  useNotAuthRedirect(store, history);

  const fetchingRedirectResult = useSignInRedirectResult(store, history);
  if (fetchingRedirectResult) {
    return <div>loading...</div>;
  }

  return (
    <React.Fragment>
      <GlobalStyle />
      <PageContent />
    </React.Fragment>
  );
};

const App = withRouter(WrappedApp);

export { App, WrappedApp as AppForTest };
