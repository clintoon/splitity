import { assert } from '@web/lib/assert';

describe('assert', (): void => {
  it('does not throw an error if the condition is true', async (): Promise<
    void
  > => {
    const toNotThrow = async (): Promise<void> => {
      assert(true, 'potato');
    };

    await expect(toNotThrow()).resolves.not.toThrow();
  });

  it('throws an error when of the condition is false', async (): Promise<
    void
  > => {
    const toThrow = async (): Promise<void> => {
      assert(false, 'potato');
    };

    await expect(toThrow()).rejects.toThrowErrorMatchingInlineSnapshot(
      `"potato"`
    );
  });

  it('throws an error when of the condition is false and no message', async (): Promise<
    void
  > => {
    const toThrow = async (): Promise<void> => {
      assert(false);
    };

    await expect(toThrow()).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Assertion failed"`
    );
  });
});
