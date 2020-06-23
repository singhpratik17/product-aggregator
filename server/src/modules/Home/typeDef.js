const { gql } = require('apollo-server-express');

const typeDef = gql`
  type Product {
    id: String
    name: String
    productUrl: String
    featuresList: [String]
    price: String
    originalPrice: String
    offerText: String
    imgUrl: String
  }

  type Result {
    flipkartResults: [Product]
    amazonResults: [Product]
  }

  extend type Query {
    init: Boolean
  }

  extend type Mutation {
    searchProducts(searchText: String!): Result
  }
`;

module.exports = typeDef;
