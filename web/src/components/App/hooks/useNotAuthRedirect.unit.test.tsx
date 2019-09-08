import { createMemoryHistory } from 'history';
import { renderHook } from '@testing-library/react-hooks';

import { FirebaseAuth } from '@web/lib/firebase/auth';
import { useNotAuthRedirect } from '@web/components/App/hooks/useNotAuthRedirect';

jest.mock('@web/lib/firebase/auth');

describe('useNotAuthRedirect', (): void => {
  it('calls unsubscribe when component is unmounted', (): void => {
    const unsubscribeMock = jest.fn();
    jest
      .spyOn(FirebaseAuth.prototype, 'onAuthStateChanged')
      .mockReturnValue(unsubscribeMock);

    const history = createMemoryHistory();

    const { unmount } = renderHook((): void => useNotAuthRedirect(history));
    unmount();
    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
