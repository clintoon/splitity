import { CurrentUser } from '@web/stores/authStore';

const currentUserFactory = (): CurrentUser => {
  return {
    userId: 123,
  };
};

export { currentUserFactory };
