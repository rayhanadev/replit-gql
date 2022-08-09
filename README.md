# Replit GraphQL

Reusable function to query Replit's GraphQL API. Written to consume [@apollo/client](https://github.com/apollographql/apollo-client)
with a patched node-fetch used by Replit.

It is recommended you add [babel-plugin-import-graphql](https://www.npmjs.com/package/babel-plugin-import-graphql)
to your Babel configuration to import `.graphql` files. Otherwise you may use [graphql-tag](https://www.npmjs.com/package/graphql-tag)
to the same effect.

For information on how to use the ApolloClient, visit its [core API docs](https://www.apollographql.com/docs/react/api/core/ApolloClient).
Note, this package uses the core ApolloClient, not the React view layer.