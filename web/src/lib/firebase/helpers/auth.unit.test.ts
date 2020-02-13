import { mock, when, instance } from 'ts-mockito';
import { User, auth, UserInfo } from 'firebase/app';
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

    const providerDataMock = mock<UserInfo>();
    when(providerDataMock.uid).thenReturn('123');
    when(userMock.providerData).thenReturn([instance(providerDataMock)]);

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
          "userId": 123,
        }
      `);
    });
  });

  describe('transformFirebaseUser', (): void => {
    const userMock: User = mock<User>();

    const providerDataMock = mock<UserInfo>();
    when(providerDataMock.uid).thenReturn('123');
    when(userMock.providerData).thenReturn([instance(providerDataMock)]);

    it('returns the correct output', (): void => {
      expect(
        transformFirebaseUser({
          user: instance(userMock),
        })
      ).toMatchInlineSnapshot(`
        Object {
          "userId": 123,
        }
      `);
    });
  });
});
