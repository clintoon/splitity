import React from 'react';
import { GithubDashboard } from './GithubDashboard';
import { RenderResult, render, within, wait } from '@testing-library/react';
import { TestStoreProvider, mockStoreFactory } from '@web/testing/mockStore';
import { currentUserFactory } from '@web/testing/mockCurrentUser';
import {
  SETTINGS_SECTION_INSTALL_APP_TESTID,
  SETTINGS_SECTION_MANAGE_APP_TESTID,
} from './SettingsSection';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';
import * as OpenPage from '@web/lib/actions/openPage';
import { Simulate } from 'react-dom/test-utils';
import { noop } from 'lodash';
import { BackendAPI } from '@web/lib/backend/backendApi';

jest.mock('@web/lib/backend/backendApi');

interface RenderGithubDashboardResult {
  renderResult: RenderResult;
  onAddReposClickSpy: jest.SpyInstance;
  onInstallGithubAppSpy: jest.SpyInstance;
}

interface RenderGithubDashboardOptions {
  hasInstalledGithubApp: boolean;
}

const renderGithubDashboard = ({
  hasInstalledGithubApp,
}: RenderGithubDashboardOptions): RenderGithubDashboardResult => {
  const currentUserData = currentUserFactory();

  jest
    .spyOn(BackendAPI.prototype, 'getGithubAppInstallations')
    .mockResolvedValue(
      hasInstalledGithubApp
        ? [{ installationId: 123, accountId: currentUserData.userId }]
        : []
    );

  const onAddReposClickSpy = jest
    .spyOn(OpenPage, 'onAddReposClick')
    .mockImplementation(noop);
  const onInstallGithubAppSpy = jest
    .spyOn(OpenPage, 'onInstallGithubApp')
    .mockImplementation(noop);

  const storeOptions = {
    auth: {
      currentUser: {
        ...currentUserData,
      },
    },
  };
  const stores = mockStoreFactory(storeOptions);

  const renderResult = render(
    <TestStoreProvider stores={stores}>
      <GithubDashboard />
    </TestStoreProvider>
  );

  return { renderResult, onAddReposClickSpy, onInstallGithubAppSpy };
};

describe('<GithubDashboard/>', (): void => {
  it('displays the install app button when app is not installed', async (): Promise<
    void
  > => {
    const { renderResult } = renderGithubDashboard({
      hasInstalledGithubApp: false,
    });

    await wait((): void => {
      const installAppContainer = renderResult.getByTestId(
        SETTINGS_SECTION_INSTALL_APP_TESTID
      );
      expect(within(installAppContainer).queryByTestId(BUTTON_TESTID)).not.toBe(
        null
      );
    });
  });

  it('install app button triggers the opening of github install app page', async (): Promise<
    void
  > => {
    const { renderResult, onInstallGithubAppSpy } = renderGithubDashboard({
      hasInstalledGithubApp: false,
    });
    await wait((): void => {
      const installAppContainer = renderResult.getByTestId(
        SETTINGS_SECTION_INSTALL_APP_TESTID
      );
      const installAppButton = within(installAppContainer).getByTestId(
        BUTTON_TESTID
      );

      Simulate.click(installAppButton);
      expect(onInstallGithubAppSpy).toBeCalled();
    });
  });

  it('displays the manage app button when app is not installed', async (): Promise<
    void
  > => {
    const { renderResult } = renderGithubDashboard({
      hasInstalledGithubApp: true,
    });

    await wait((): void => {
      const manageAppContainer = renderResult.getByTestId(
        SETTINGS_SECTION_MANAGE_APP_TESTID
      );
      expect(within(manageAppContainer).queryByTestId(BUTTON_TESTID)).not.toBe(
        null
      );
    });
  });

  it('manage app button triggers the github app configure page', async (): Promise<
    void
  > => {
    const { renderResult, onAddReposClickSpy } = renderGithubDashboard({
      hasInstalledGithubApp: true,
    });

    await wait((): void => {
      const manageAppContainer = renderResult.getByTestId(
        SETTINGS_SECTION_MANAGE_APP_TESTID
      );
      const manageAppButton = within(manageAppContainer).getByTestId(
        BUTTON_TESTID
      );

      Simulate.click(manageAppButton);
      expect(onAddReposClickSpy).toBeCalledWith(123);
    });
  });
});
