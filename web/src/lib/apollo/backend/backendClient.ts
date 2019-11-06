import ApolloClient from 'apollo-boost';

const backendClient = new ApolloClient({
  uri: 'http://localhost:4000',
});

export { backendClient };
