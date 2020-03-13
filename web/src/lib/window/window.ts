const setSessionStorageItem = (key: string, value: string): void => {
  window.sessionStorage.setItem(key, value);
};

const getSessionStorageItem = (key: string): string | null => {
  return window.sessionStorage.getItem(key);
};

const removeSessionStorageItem = (key: string): void => {
  window.sessionStorage.removeItem(key);
};

const setHref = (url: string): void => {
  window.location.href = url;
};

const clearQueryParams = (): void => {
  window.history.replaceState(null, document.title, window.location.pathname);
};

export {
  setSessionStorageItem,
  getSessionStorageItem,
  removeSessionStorageItem,
  setHref,
  clearQueryParams,
};
