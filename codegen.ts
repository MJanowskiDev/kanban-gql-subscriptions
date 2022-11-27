import type { CodegenConfig } from "@graphql-codegen/cli";

if (!process.env.NEXT_PUBLIC_HASURA_GQL) {
  throw Error("no gql url available");
}

if (!process.env.NEXT_PUBLIC_HASURA_ADMIN_KEY) {
  throw Error("no gql admin key available");
}

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env.NEXT_PUBLIC_HASURA_GQL]: {
        headers: {
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_KEY,
        },
      },
    },
  ],
  documents: "graphql/*.graphql",
  generates: {
    "graphql/generated/gql-types.ts": {
      // preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
``;
