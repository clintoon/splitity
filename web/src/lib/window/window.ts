const setSessionStorageItem = (key: string, value: string): void => {
  window.sessionStorage.setItem(key, value);
};

const getSessionStorageItem = (key: string): string | null => {
  return window.sessionStorage.getItem(key);
};

const setHref = (url: string): void => {
  window.location.href = url;
};

export { setSessionStorageItem, getSessionStorageItem, setHref };
