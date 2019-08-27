import { useContext } from 'react';
import { storeContext, StoreType } from '@web/stores/storeProvider';

const useStore = (): StoreType => {
  const store = useContext(storeContext);
  if (!store) {
    throw Error(
      'Please wrap component with StoreProvider. storeContext is null.'
    );
  }

  return store;
};

export { useStore };
