import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { AuthModel, AuthModelType } from '@web/stores/authStore';

export interface StoreProviderProps {
  children: React.ReactNode;
}

export interface StoreType {
  auth: AuthModelType;
}

const storeContext = React.createContext<StoreType | null>(null);

const StoreProvider = ({ children }: StoreProviderProps): JSX.Element => {
  const stores = {
    auth: useLocalStore((): AuthModelType => AuthModel.create({})),
  };

  return (
    <storeContext.Provider value={stores}>{children}</storeContext.Provider>
  );
};

export { StoreProvider, storeContext };
