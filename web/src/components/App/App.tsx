import React from 'react';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { PageContent } from '@web/components/App/PageContent';
import { useStore } from '@web/stores/useStore';
import { withRouter, RouteComponentProps } from 'react-router';
import { useSignInRedirectResult } from '@web/components/App/hooks/useSignInRedirectResult';
import { useSyncUserStore } from '@web/components/App/hooks/useSyncUserStore';
import { useNotAuthRedirect } from '@web/components/App/hooks/useNotAuthRedirect';

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
