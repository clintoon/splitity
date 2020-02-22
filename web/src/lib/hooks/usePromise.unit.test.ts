import { renderHook } from '@testing-library/react-hooks';
import { usePromise } from './usePromise';

describe('usePromise', (): void => {
  it('returns the default value when still pending', async (): Promise<
    void
  > => {
    const mockPromise = new Promise((resolve): void => {
      resolve('resolved value');
    });

    const { result } = renderHook((): unknown =>
      usePromise(mockPromise, 'default')
    );

    expect(result.current).toBe('default');
  });

  it('returns the resolved value', async (): Promise<void> => {
    // TODO(clinton): Fix act warning
    const mockPromise = new Promise((resolve): void => {
      resolve('resolved value');
    });

    const { result, waitForNextUpdate } = renderHook((): unknown =>
      usePromise(mockPromise)
    );

    await waitForNextUpdate();
    expect(result.current).toBe('resolved value');
  });
});
