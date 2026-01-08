"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { ApolloProvider as BaseApolloProvider } from "@apollo/client/react";
import { useMemo } from "react";

const GRAPHQL_ENDPOINT = "https://rickandmortyapi.com/graphql";

interface ApolloProviderProps {
  children: React.ReactNode;
}

/**
 * Apollo Client provider for GraphQL queries
 * Configured for the Rick and Morty API
 */
export function ApolloProvider({ children }: ApolloProviderProps) {
  const client = useMemo(
    () =>
      new ApolloClient({
        link: new HttpLink({ uri: GRAPHQL_ENDPOINT }),
        cache: new InMemoryCache(),
      }),
    []
  );

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}
