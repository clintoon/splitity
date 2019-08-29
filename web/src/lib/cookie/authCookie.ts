import Cookies from 'js-cookie';
import { CookieName } from '@web/lib/cookie/constants';

const setOAuthToken = (oAuthToken: string): void => {
  // TODO: double check security implications
  Cookies.set(CookieName.Auth, { oAuthToken });
};

const getOAuthToken = (): string => {
  const oAuthToken = Cookies.getJSON(CookieName.Auth).oAuthToken;
  if (!oAuthToken) {
    throw Error('Trying to obtain oAuthToken cookie when it is unset');
  }
  return oAuthToken;
};

const clearAuthCookie = (): void => {
  Cookies.remove(CookieName.Auth);
};

export { setOAuthToken, getOAuthToken, clearAuthCookie };
