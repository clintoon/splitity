import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { useStore } from '@web/stores/useStore';
import { StoreProvider } from '@web/stores/storeProvider';

describe('useStore', (): void => {
  const TestComponent = (): null => {
    useStore();
    return null;
  };

  it('shows an exception when not wrapped in <StoreProvider />', (): void => {
    // Mocking console.error to not dump error to console
    const consoleErrSpy = jest.spyOn(console, 'error');
    consoleErrSpy.mockImplementation((): void => {});

    expect((): void => {
      mount(<TestComponent />);
    }).toThrow(
      'Please wrap component with StoreProvider. storeContext is null.'
    );

    consoleErrSpy.mockRestore();
  });

  it("doesn't throw an exception when wrapped in <StoreProvider />", (): void => {
    const wrapper = mount(
      <StoreProvider>
        <TestComponent />
      </StoreProvider>
    );

    expect(wrapper.find(TestComponent).exists()).toBe(true);
  });
});
