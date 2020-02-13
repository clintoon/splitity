import { CurrentUser } from '@web/stores/authStore';

interface CurrentUserFactoryOptions {
  githubInstallationId: number | null;
}

const currentUserFactory = (
  options?: CurrentUserFactoryOptions
): CurrentUser => {
  return {
    userId: 123,
    githubInstallationId: options ? options.githubInstallationId : null,
  };
};

export { currentUserFactory };
