import { mock, when, instance } from 'ts-mockito';
import { User, auth } from 'firebase';
import { transformRedirectResult } from '@web/lib/firebase/helpers/auth';

describe('auth', (): void => {
  describe('transformRedirectResult', (): void => {
    const credentialMock = mock<auth.AuthCredential>();
    when(credentialMock.toJSON()).thenReturn({
      oauthAccessToken: 'oauthAccessToken',
      providerId: 'providerId',
    });

    const userMock: User = mock<User>();
    when(userMock.email).thenReturn('email');
    when(userMock.emailVerified).thenReturn(true);
    when(userMock.uid).thenReturn('uid');

    it('returns undefined when result.user is undefined', (): void => {
      expect(
        transformRedirectResult({
          credential: instance(credentialMock),
          user: null,
        })
      ).toBeNull();
    });

    it('returns undefined when result.user.credentials is undefined', (): void => {
      expect(
        transformRedirectResult({
          credential: null,
          user: instance(userMock),
        })
      ).toBeNull();
    });

    it('return correct values when input is correct', (): void => {
      expect(
        transformRedirectResult({
          credential: instance(credentialMock),
          user: instance(userMock),
        })
      ).toMatchInlineSnapshot(`
        Object {
          "email": "email",
          "emailVerified": true,
          "oauthToken": "oauthAccessToken",
          "providerId": "providerId",
          "userId": "uid",
        }
      `);
    });
  });
});
