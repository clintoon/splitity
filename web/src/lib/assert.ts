function assert (condition: unknown, message?: string ): asserts condition {
  if (!condition) {
    const errorMessage = message || 'Assertion failed';
    throw Error(errorMessage);
  }
};

export { assert };