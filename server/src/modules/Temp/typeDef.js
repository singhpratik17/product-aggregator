const { gql } = require('apollo-server-express');

const typeDef = gql`
  type UserAccount {
    id: String
    name: String
    phone: String
    status: String
    dob: Date
  }
  
  type Query {
    userAccount: UserAccount
  }
`;

module.exports = typeDef;
