import { githubConfig } from '@web/config/github';
import { track } from '../analytics/tracking';
import { TrackingEvent } from '../analytics/events';

const onAddReposClick = (githubInstallationId: number): void => {
  track(TrackingEvent.openConfigureAppInstallationPage);
  window.open(
    `https://github.com/settings/installations/${githubInstallationId}`
  );
};

const onInstallGithubApp = (): void => {
  track(TrackingEvent.openInstallAppPage);
  window.open(`https://github.com/apps/${githubConfig.githubAppName}`);
};

export { onAddReposClick, onInstallGithubApp };
