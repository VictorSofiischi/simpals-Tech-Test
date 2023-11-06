// apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://point.md/graphql',
  cache: new InMemoryCache(),
});

export default client;
