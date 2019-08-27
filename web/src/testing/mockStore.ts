import { StoreType } from '@web/stores/storeProvider';
import { AuthModel } from '@web/stores/authStore';

const mockStoreFactory = (initial: Partial<StoreType> = {}): StoreType => {
  return {
    auth: AuthModel.create(initial.auth || {}),
  };
};

export { mockStoreFactory };
