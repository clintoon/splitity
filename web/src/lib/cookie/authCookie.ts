import Cookies from 'js-cookie';
import { CookieName } from '@web/lib/cookie/constants';

const setOAuthToken = (authToken: string): void => {
  Cookies.set(
    CookieName.Auth,
    { authToken },
    { sameSite: 'strict', expires: 28 }
  );
};

const getOAuthToken = (): string | undefined => {
  const authToken = Cookies.getJSON(CookieName.Auth)?.authToken;
  if (!authToken) {
    return undefined;
  }
  return authToken;
};

const clearAuthCookie = (): void => {
  Cookies.remove(CookieName.Auth);
};

export { setOAuthToken, getOAuthToken, clearAuthCookie };
