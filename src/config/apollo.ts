import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URLBASE,
  fetch
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = process.env.NEXT_PUBLIC_CMS_GRAPHQL_APIKEY;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export default class GraphQLClient {
  private static instance: ApolloClient<NormalizedCacheObject>;

  static getInstance(): ApolloClient<NormalizedCacheObject> {
    if (!GraphQLClient.instance) {
      GraphQLClient.instance = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
      });
    }
    return GraphQLClient.instance;
  }
}
