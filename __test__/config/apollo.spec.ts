import { ApolloClient } from '@apollo/client';
import GraphQLClient from '../../src/config/apollo';

describe('Apollo client', () => {
  it('get instance create new apollo client', () => {
    const client = GraphQLClient.getInstance();

    expect(client).not.toBeNull();
    expect(client).toBeInstanceOf(ApolloClient);
  });

  it.each(new Array(10).fill(0))('call 10 times getInstance return an instance', () => {
    const client = GraphQLClient.getInstance();

    expect(client).not.toBeNull();
    expect(client).toBeInstanceOf(ApolloClient);
  });
});
