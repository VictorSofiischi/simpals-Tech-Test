'use client';
import { ApolloProvider } from '@apollo/client';
import client from '@/appolo/apolloClient';


export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}