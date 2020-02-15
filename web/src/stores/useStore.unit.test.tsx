import { renderHook } from '@testing-library/react-hooks';
import { useStore } from '@web/stores/useStore';
import { StoreType, StoreProvider } from '@web/stores/storeProvider';

describe('useStore', (): void => {
  it('shows an exception when not wrapped in <StoreProvider />', (): void => {
    // Mocking console.error to not dump error to console
    const consoleErrSpy = jest.spyOn(console, 'error');
    consoleErrSpy.mockImplementation((): void => {});

    const { result } = renderHook((): StoreType => useStore());
    expect(result.error).toEqual(
      Error('Please wrap component with StoreProvider. storeContext is null.')
    );
    consoleErrSpy.mockRestore();
  });

  it("doesn't throw an exception when wrapped in <StoreProvider />", (): void => {
    const { result } = renderHook((): StoreType => useStore(), {
      wrapper: StoreProvider,
    });
    expect(result.error).toEqual(undefined);
  });
});
