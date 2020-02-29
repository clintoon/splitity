import React from 'react';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { PageContent } from '@web/components/App/PageContent';
import { useStore } from '@web/stores/useStore';
import { observer } from 'mobx-react-lite';

const APP_LOADING = 'app-loading';

const App = observer(
  (): JSX.Element => {
    const displayLoading = <div data-testid={APP_LOADING}>loading...</div>;
    const store = useStore();

    return (
      <React.Fragment>
        <GlobalStyle />
        <PageContent />
      </React.Fragment>
    );
  }
);

export { App, APP_LOADING };
