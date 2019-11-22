import { CurrentUser } from '@web/stores/authStore';

interface CurrentUserFactoryOptions {
  githubInstallationId: number | null;
}

const currentUserFactory = (
  options?: CurrentUserFactoryOptions
): CurrentUser => {
  return {
    email: 'clintonfeng@gmail.com',
    emailVerified: false,
    userId: 'abc123',
    githubInstallationId: options ? options.githubInstallationId : null,
  };
};

export { currentUserFactory };
