import { ApolloServer, gql } from 'apollo-server';

interface CurrentUser {
  hasInstalledGithubApp: boolean;
}

const typeDefs = gql`
  type CurrentUser {
    hasInstalledGithubApp: Boolean
  }

  type Query {
    currentUser: CurrentUser
  }
`;

const resolvers = {
  Query: {
    currentUser: (): CurrentUser => {
      return {
        hasInstalledGithubApp: true,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const main = async (): Promise<void> => {
  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
};

main();
