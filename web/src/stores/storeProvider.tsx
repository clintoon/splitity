import React from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { AuthModel, AuthModelType } from '@web/stores/authStore';

export interface StoreType {
  auth: AuthModelType;
}

export interface StoreProviderProps {
  children: React.ReactNode;
  storeValues: Partial<StoreType>;
}

const storeContext = React.createContext<StoreType | null>(null);

const StoreProvider = ({
  children,
  storeValues,
}: StoreProviderProps): JSX.Element => {
  const stores = {
    auth: useLocalStore(
      (): AuthModelType => AuthModel.create(storeValues.auth || {})
    ),
  };

  return (
    <storeContext.Provider value={stores}>{children}</storeContext.Provider>
  );
};

StoreProvider.defaultProps = {
  storeValues: {},
};

export { StoreProvider, storeContext };
