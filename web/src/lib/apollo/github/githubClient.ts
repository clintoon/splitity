import ApolloClient from 'apollo-boost';
import { getOAuthToken } from '@web/lib/cookie/authCookie';

const githubClient = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation): void => {
    const oAuthToken = getOAuthToken();
    operation.setContext({
      headers: {
        authorization: oAuthToken ? `token ${oAuthToken}` : '',
      },
    });
  },
});

export { githubClient };
