import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { App } from '@web/components/App';
import { GlobalStyle } from '@web/design/styles/GlobalStyle';
import { PageContent } from '@web/components/PageContent';
import { StoreType } from '@web/stores/storeProvider';
import { mockStoreFactory, TestStoreProvider } from '@web/testing/mockStore';
import { MemoryRouter } from 'react-router';
import * as UseNotAuthRedirect from '@web/hooks/useNotAuthRedirect';
import * as UseSignInRedirectResult from '@web/hooks/useSignInRedirectResult';
import * as UseSyncUserStore from '@web/hooks/useSyncUserStore';
import { noop } from '@babel/types';

jest.mock('@web/lib/firebase/auth');

describe('<App />', (): void => {
  let stores: StoreType;
  let wrapper: ReactWrapper;

  beforeEach((): void => {
    jest
      .spyOn(UseSignInRedirectResult, 'useSignInRedirectResult')
      .mockReturnValue(false);
    jest.spyOn(UseSyncUserStore, 'useSyncUserStore');
    jest.spyOn(UseNotAuthRedirect, 'useNotAuthRedirect');

    stores = mockStoreFactory();
    wrapper = mount(
      <MemoryRouter>
        <TestStoreProvider stores={stores}>
          <App />
        </TestStoreProvider>
      </MemoryRouter>
    );
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it('renders <GlobalStyle />', (): void => {
    expect(wrapper.find(GlobalStyle).exists()).toBe(true);
  });

  it('renders <PageContent />', (): void => {
    expect(wrapper.find(PageContent).exists()).toBe(true);
  });

  it('renders loading when is fetching redirect result', (): void => {
    jest
      .spyOn(UseSignInRedirectResult, 'useSignInRedirectResult')
      .mockReturnValue(true);

    wrapper = mount(
      <MemoryRouter>
        <TestStoreProvider stores={stores}>
          <App />
        </TestStoreProvider>
      </MemoryRouter>
    );

    expect(wrapper.find(PageContent).exists()).toBe(false);
  });
});
