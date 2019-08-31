import React from 'react';
import { mount } from 'enzyme';
import { ToSignInPage } from '@web/pages/Auth/ToSignInPage';
import * as StoreUser from '@web/pages/Auth/storeUser';
import { mockStoreFactory, TestStoreProvider } from '@web/testing/mockStore';

describe('<ToSignInPage />', (): void => {
  let storeUserSpy: jest.SpyInstance;

  beforeEach((): void => {
    storeUserSpy = jest
      .spyOn(StoreUser, 'storeUser')
      .mockResolvedValue(undefined);
    mount(
      <TestStoreProvider stores={mockStoreFactory()}>
        <ToSignInPage />
      </TestStoreProvider>
    );
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it('calls storeUser', (): void => {
    expect(storeUserSpy).toHaveBeenCalled();
  });
});
