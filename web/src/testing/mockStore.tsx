import React from 'react';
import { StoreType, storeContext } from '@web/stores/storeProvider';
import { AuthModel, CurrentUser } from '@web/stores/authStore';

export interface InitialStore {
  auth?: {
    currentUser: CurrentUser;
  };
}

const mockStoreFactory = (initial: InitialStore = {}): StoreType => {
  return {
    auth: AuthModel.create(initial.auth || {}),
  };
};

interface TestStoreProviderProps {
  stores: StoreType;
  children: React.ReactNode;
}

const TestStoreProvider = ({
  stores,
  children,
}: TestStoreProviderProps): JSX.Element => {
  return (
    <storeContext.Provider value={stores}>{children}</storeContext.Provider>
  );
};

export { mockStoreFactory, TestStoreProvider };
