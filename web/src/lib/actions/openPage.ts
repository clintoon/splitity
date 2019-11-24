import { githubConfig } from '@web/config/github';

const onAddReposClick = (githubInstallationId: number): void => {
  window.open(
    `https://github.com/settings/installations/${githubInstallationId}`
  );
};

const onInstallGithubApp = (): void => {
  window.open(`https://github.com/apps/${githubConfig.githubAppName}`);
};

export { onAddReposClick, onInstallGithubApp };
