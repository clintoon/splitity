import React from 'react';
import { mount } from 'enzyme';
import { ToSignInPage } from '@web/pages/Auth/ToSignInPage';
import * as StoreUser from '@web/pages/Auth/storeUser';
import { StoreProvider } from '@web/stores/storeProvider';

describe('<ToSignInPage />', (): void => {
  let storeUserSpy: jest.SpyInstance;

  beforeEach((): void => {
    storeUserSpy = jest
      .spyOn(StoreUser, 'storeUser')
      .mockResolvedValue(undefined);
    mount(
      <StoreProvider>
        <ToSignInPage />
      </StoreProvider>
    );
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it('calls storeUser', (): void => {
    expect(storeUserSpy).toHaveBeenCalled();
  });
});
