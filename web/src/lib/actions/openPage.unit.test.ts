import { onAddReposClick, onInstallGithubApp } from '@web/lib/actions/openPage';
import { GITHUB_APP_NAME } from '@web/testing/testGlobals';

const GITHUB_INSTALLATION_ID = 123;

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
  });

  describe('onInstallGithubApp', (): void => {
    it('opens new tab with correct url', (): void => {
      const windowOpenSpy = jest
        .spyOn(window, 'open')
        .mockImplementation((): null => null);

      onInstallGithubApp();

      expect(windowOpenSpy).toBeCalledWith(
        `https://github.com/apps/${GITHUB_APP_NAME}`
      );
    });
  });
});
