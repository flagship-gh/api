const { gql } = require("apollo-server-express");

module.exports = gql`
  type Admin {
    _id: ID
    lastName: String
    otherNames: String
    email: String
    phone: String
    deleted: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type AdminAuth {
    admin: Admin
    token: String
  }
  input GetAdminsFilter {
    suspended: Boolean
    search: String
    searchFields: [String]
    order: DocumentOrder
    orderBy: String
    dateField: String
    dateRange: DateRange
  }

  input CreateAdminInput {
    lastName: String!
    otherNames: String!
    email: String!
    phone: String!
    password: String!
    groupId: ID
  }

  input UpdateAdminInput {
    adminId: ID!
    groupId: ID
    lastName: String
    otherNames: String
    email: String
    phone: String
  }

  input SuspendAdminInput {
    adminId: ID!
  }
  input LoginAdminInput {
    "email or phone number"
    username: String!
    password: String!
  }

  input UpdateAdminPasswordInput {
    password: String!
  }
  input GetAdminFilter {
    adminId: ID!
  }

  extend type Query {
    admin(filter: GetAdminFilter!): Admin
    admins(filter: GetAdminsFilter = {}, pagination: Pagination): [Admin]
    adminsLength(filter: GetAdminsFilter = {}): Int
  }

  extend type Mutation {
    createAdmin(input: CreateAdminInput!): Admin
    updateAdmin(input: UpdateAdminInput!): Admin
    suspendAdmin(input: SuspendAdminInput!): Admin
    loginAdmin(input: LoginAdminInput!): AdminAuth
    updateAdminPassword(input: UpdateAdminPasswordInput!): Admin
  }
`;
