const { gql } = require("apollo-server-express");

module.exports = gql`
  enum LocationType {
    Point
  }

  enum ShopType {
    Salon
    BarberingShop
  }

  enum ShopStatus {
    Registered
    Unregistered
  }

  type Location {
    type: LocationType
    coordinates: [Float]
  }

  input LocationInput {
    type: LocationType
    coordinates: [Float]
  }

  "Registered Shops"
  type Shop {
    _id: ID
    code: String
    email: String
    phone: String
    employeeSize: Int
    shopType: ShopType
    address: String
    timeOpen: String
    timeClose: String
    status: ShopStatus
  }

  input GetShopFilter {
    shopId: ID!
  }

  input GetShopsFilter {
    dateField: String
    dateRange: DateRange
    searchFields: String
    search: String
    orderBy: String
    order: DocumentOrder
  }

  input CreateShopInput {
    email: String!
    phone: String!
    employeeSize: Int
    shopType: ShopType!
    address: String
    location: LocationInput
    timeOpen: String
    timeClose: String
    status: ShopStatus
  }

  extend type Query {
    shop(filter: GetShopFilter = {}): Shop
    shops(filter: GetShopsFilter = {}, pagination: Pagination): [Shop]
    shopsLength(filter: GetShopsFilter = {}): Int
  }

  extend type Mutation {
    createShop(input: CreateShopInput!): Shop
  }
`;
