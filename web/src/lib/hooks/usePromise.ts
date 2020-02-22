import { useState, useEffect } from 'react';

const usePromise = <T>(
  promise: Promise<T>,
  defaultValue?: T
): T | undefined => {
  const [value, setValue] = useState<T | undefined>(defaultValue);
  let subscribed = true;

  useEffect((): (() => void) => {
    const fetch = async (): Promise<void> => {
      const result = await promise;
      if (subscribed) {
        setValue(result);
      }
    };

    fetch();

    return (): void => {
      subscribed = false;
    };
  });

  return value;
};

export { usePromise };
