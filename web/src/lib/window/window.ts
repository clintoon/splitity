const setSessionStorageItem = (key: string, value: string): void => {
  window.sessionStorage.setItem(key, value);
};

const setHref = (url: string): void => {
  window.location.href = url;
};

export { setSessionStorageItem, setHref };
