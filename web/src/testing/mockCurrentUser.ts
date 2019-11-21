import { CurrentUser } from '@web/stores/authStore';

const currentUserFactory = (): CurrentUser => {
  return {
    email: 'clintonfeng@gmail.com',
    emailVerified: false,
    userId: 'abc123',
    githubInstallationId: null,
  };
};

export { currentUserFactory };
