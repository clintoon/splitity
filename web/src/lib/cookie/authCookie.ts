import Cookies from 'js-cookie';
import { CookieName } from '@web/lib/cookie/constants';

const setOAuthToken = (oAuthToken: string): void => {
  // TODO(clinton): double check security implications
  Cookies.set(CookieName.Auth, { oAuthToken });
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
