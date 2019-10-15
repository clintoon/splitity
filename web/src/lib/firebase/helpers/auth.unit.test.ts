import { mock, when, instance } from 'ts-mockito';
import { User, auth } from 'firebase';
import {
  transformRedirectResult,
  transformFirebaseUser,
} from '@web/lib/firebase/helpers/auth';

describe('auth', (): void => {
  describe('transformRedirectResult', (): void => {
    const credentialMock = mock<auth.AuthCredential>();
    when(credentialMock.toJSON()).thenReturn({
      oauthAccessToken: 'oauthAccessToken',
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
          "userId": "uid",
        }
      `);
    });
  });

  describe('transformFirebaseUser', (): void => {
    const userMock: User = mock<User>();
    when(userMock.email).thenReturn('email');
    when(userMock.emailVerified).thenReturn(true);
    when(userMock.uid).thenReturn('uid');

    it('returns the correct output', (): void => {
      expect(
        transformFirebaseUser({
          user: instance(userMock),
        })
      ).toMatchInlineSnapshot(`
        Object {
          "email": "email",
          "emailVerified": true,
          "userId": "uid",
        }
      `);
    });
  });
});
