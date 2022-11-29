import "../styles/global.css";
import type { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../graphql/apolloClient";

import { Layout } from "../components/UI/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
