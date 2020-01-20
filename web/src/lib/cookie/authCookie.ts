import Cookies from 'js-cookie';
import { CookieName } from '@web/lib/cookie/constants';

const setOAuthToken = (oAuthToken: string): void => {
  Cookies.set(CookieName.Auth, { oAuthToken }, { sameSite: 'strict' });
};

const getOAuthToken = (): string | undefined => {
  const oAuthToken = Cookies.getJSON(CookieName.Auth).oAuthToken;
  if (!oAuthToken) {
    return undefined;
  }
  return oAuthToken;
};

const clearAuthCookie = (): void => {
  Cookies.remove(CookieName.Auth);
};

export { setOAuthToken, getOAuthToken, clearAuthCookie };
