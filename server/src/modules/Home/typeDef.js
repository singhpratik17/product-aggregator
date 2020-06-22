const { gql } = require('apollo-server-express');

const typeDef = gql`
  type Product {
    id: String
    name: String
  }
  
  extend type Query {
      init: Boolean
  }
  
  extend type Mutation {
      searchProducts(searchText: String!): Product
  }
`;

module.exports = typeDef;
