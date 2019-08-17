import React from 'react';
import { mount } from 'enzyme';
import { ToSignInPage } from '@web/pages/Auth/ToSignInPage';
import * as StoreUser from '@web/pages/Auth/storeUser';

describe('<ToSignIn />', (): void => {
  let storeUserSpy: jest.SpyInstance;

  beforeEach((): void => {
    storeUserSpy = jest.spyOn(StoreUser, 'storeUser');
    mount(<ToSignInPage />);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it('calls storeUser', (): void => {
    expect(storeUserSpy).toHaveBeenCalled();
  });
});
