"use client";

import { ApolloProvider } from "@/providers/apollo-provider";
import { SessionProvider } from "@/providers/session-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Combined providers wrapper for the application
 * Includes session management and Apollo GraphQL client
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ApolloProvider>{children}</ApolloProvider>
    </SessionProvider>
  );
}
