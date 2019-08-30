import { CurrentUser } from '@web/stores/authStore';

const currentUserFactory = (): CurrentUser => {
  return {
    email: 'clintonfeng@gmail.com',
    oAuthToken: 'oAuthToken',
    emailVerified: false,
    userId: 'abc123',
  };
};

export { currentUserFactory };
