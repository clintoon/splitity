import React from 'react';
import { mount } from 'enzyme';
import { ToSignInPage } from '@web/pages/Auth/ToSignInPage';
import * as HandleSignIn from '@web/pages/Auth/handleSignIn';
import { mockStoreFactory, TestStoreProvider } from '@web/testing/mockStore';

describe('<ToSignInPage />', (): void => {
  let handleSignInSpy: jest.SpyInstance;

  beforeEach((): void => {
    handleSignInSpy = jest
      .spyOn(HandleSignIn, 'handleSignIn')
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

  it('calls handleSignIn', (): void => {
    expect(handleSignInSpy).toHaveBeenCalled();
  });
});
