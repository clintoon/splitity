import { renderHook } from '@testing-library/react-hooks';

import { FirebaseAuth } from '@web/lib/firebase/auth';
import { useSyncUserStore } from '@web/components/App/hooks/useSyncUserStore';
import { mockStoreFactory } from '@web/testing/mockStore';

jest.mock('@web/lib/firebase/auth');

describe('useSyncUserStore', (): void => {
  it('calls unsubscribe when component is unmounted', (): void => {
    const unsubscribeMock = jest.fn();
    jest
      .spyOn(FirebaseAuth.prototype, 'onAuthStateChanged')
      .mockReturnValue(unsubscribeMock);

    const stores = mockStoreFactory();

    const { unmount } = renderHook((): void => {
      useSyncUserStore(stores);
    });
    unmount();
    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
