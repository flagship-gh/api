const { gql, ApolloServer } = require("apollo-server-express");
const { SetContext, FormatError } = require("../../middlewares/graphQl");

const rootTypeDef = gql`
  scalar Date

  input Pagination {
    skip: Int
    limit: Int
  }

  input DateRange {
    startDate: Date
    endDate: Date
  }

  enum DocumentOrder {
    ascending
    descending
  }

  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

function GraphQlServer() {
  return new ApolloServer({
    context: SetContext,
    subscriptions: false,
    typeDefs: [
      rootTypeDef,
      require("./adminGroups/typeDefs"),
      require("./shops/typeDefs"),
    ],
    resolvers: [
      require("./adminGroups/resolvers"),
      require("./shops/resolvers"),
    ],
    formatError: FormatError,
    introspection: true,
    playground: true,
    cors: false,
    tracing: true,
  });
}

module.exports = {
  createGraphQl: GraphQlServer,
};
