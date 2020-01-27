import { onAddReposClick, onInstallGithubApp } from '@web/lib/actions/openPage';
import { PROCESS_ENV_GITHUB_APP_NAME } from '@web/testing/testGlobals';
import { track } from '@web/lib/analytics/tracking';
import { TrackingEvent } from '../analytics/events';

const GITHUB_INSTALLATION_ID = 123;

jest.mock('@web/lib/analytics/tracking');

describe('openPage', (): void => {
  describe('onAddReposClick', (): void => {
    it('opens new tab with correct url', (): void => {
      const windowOpenSpy = jest
        .spyOn(window, 'open')
        .mockImplementation((): null => null);

      onAddReposClick(GITHUB_INSTALLATION_ID);

      expect(windowOpenSpy).toBeCalledWith(
        `https://github.com/settings/installations/${GITHUB_INSTALLATION_ID}`
      );
    });

    it('calls the openConfigureAppInstallationPage tracking event', (): void => {
      jest.spyOn(window, 'open').mockImplementation((): null => null);

      onAddReposClick(GITHUB_INSTALLATION_ID);

      expect(track).toBeCalledWith(
        TrackingEvent.openConfigureAppInstallationPage
      );
    });
  });

  describe('onInstallGithubApp', (): void => {
    it('opens new tab with correct url', (): void => {
      const windowOpenSpy = jest
        .spyOn(window, 'open')
        .mockImplementation((): null => null);

      onInstallGithubApp();

      expect(windowOpenSpy).toBeCalledWith(
        `https://github.com/apps/${PROCESS_ENV_GITHUB_APP_NAME}`
      );
    });
  });

  it('calls the openConfigureAppInstallationPage tracking event', (): void => {
    jest.spyOn(window, 'open').mockImplementation((): null => null);

    onInstallGithubApp();

    expect(track).toBeCalledWith(TrackingEvent.openInstallAppPage);
  });
});
