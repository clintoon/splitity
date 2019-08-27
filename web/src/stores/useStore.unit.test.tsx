import React from 'react';
import { mount } from 'enzyme';
import { useStore } from '@web/stores/useStore';

describe('useStore', (): void => {
  it('shows an exception when not wrapped in <StoreProvider />', (): void => {
    // Mocking console.error to not dump error to console
    const consoleErrSpy = jest.spyOn(console, 'error');
    consoleErrSpy.mockImplementation((): void => {});

    const TestComponent = (): null => {
      useStore();
      return null;
    };
    expect((): void => {
      mount(<TestComponent />);
    }).toThrow(
      'Please wrap component with StoreProvider. storeContext is null.'
    );

    consoleErrSpy.mockRestore();
  });
});
