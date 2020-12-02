const { gql } = require("apollo-server-express");

module.exports = gql`
  type AdminGroup {
    _id: ID
    code: String
    name: String
    description: String
    permissions: [String]
    createdAt: Date
    updatedAt: Date
  }
  input GetAdminGroupInput {
    adminGroupId: ID!
  }

  input CreateAdminGroupInput {
    name: String!
    description: String
    permissions: [String]
  }
  input UpdateAdminGroupInput {
    adminGroupId: ID!
    name: String
    description: String
    permissions: [String]
  }
  input DeleteAdminGroupInput {
    adminGroupId: ID!
  }
  extend type Query {
    adminGroup(filter: GetAdminGroupInput!): AdminGroup
    adminGroups: [AdminGroup]
    adminGroupsLength: Int
  }
  extend type Mutation {
    createAdminGroup(input: CreateAdminGroupInput!): AdminGroup
    updateAdminGroup(input: UpdateAdminGroupInput!): AdminGroup
    deleteAdminGroup(input: DeleteAdminGroupInput!): AdminGroup
  }
`;
