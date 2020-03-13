import { githubConfig } from '@web/config/github';
import { track } from '../analytics/tracking';
import { TrackingEvent } from '../analytics/events';
import { setHref } from '../window/window';

const onAddReposClick = (githubInstallationId: number): void => {
  track(TrackingEvent.openConfigureAppInstallationPage);
  setHref(`https://github.com/settings/installations/${githubInstallationId}`);
};

const onInstallGithubApp = (): void => {
  track(TrackingEvent.openInstallAppPage);
  setHref(`https://github.com/apps/${githubConfig.githubAppName}`);
};

export { onAddReposClick, onInstallGithubApp };
