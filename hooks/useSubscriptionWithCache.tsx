import { useEffect } from "react";
import { useQuery, DocumentNode } from "@apollo/client";
import { gql } from "@apollo/client";
import { BoardSubscriptionQueryQuery } from "../graphql/generated/gql-types";

export const useHasuraSubscriptionWithCache = <T,>(
  queryDocument: DocumentNode,
  options?: any
) => {
  const queryString = queryDocument.loc ? queryDocument.loc?.source.body : "";
  const subscriptionDocument = gql(
    queryString.replace("query", "subscription")
  );

  const queryDocumentResult = useQuery<T>(queryDocument, {
    variables: options?.variables,
  });

  useEffect(() => {
    if (queryDocumentResult?.subscribeToMore) {
      const unsubscribe = queryDocumentResult.subscribeToMore({
        document: subscriptionDocument,
        updateQuery: (_, curr) => {
          return curr.subscriptionData.data;
        },
        variables: options?.variables,
      });
      return () => unsubscribe();
    }
  }, [options?.variables, queryDocumentResult, subscriptionDocument]);

  return queryDocumentResult;
};
