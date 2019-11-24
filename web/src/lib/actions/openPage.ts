import { githubConfig } from '@web/config/github';

const onAddReposClick = (): void => {
  // TODO(clinton): open configuration page
  window.open(`https://github.com/apps/${githubConfig.githubAppName}`);
};

const onInstallGithubApp = (): void => {
  window.open(`https://github.com/apps/${githubConfig.githubAppName}`);
};

export { onAddReposClick, onInstallGithubApp };
