import { useStore } from '@web/stores/useStore';

describe('useStore', (): void => {
  it('shows an exception when not wrapped in <StoreProvider />', (): void => {
    expect((): void => {
      useStore();
    }).toThrow();
  });
});
