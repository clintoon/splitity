import { AuthModel } from '@web/stores/authStore';

// ???
const authStore = AuthModel.create({
  currentUser: undefined,
});

export { authStore };
