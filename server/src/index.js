const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const http = require('http');

require('dotenv').config({
  path: './../.env'
});

/*
  All api modules here
 */
const home = require('./modules/Home');

const configurations = {
  development: { ssl: false, port: 8081, hostname: 'localhost' }
};

const config = configurations['development'];

const app = express();

/*
  Apollo server
 */
const typeDef = gql`
  scalar Date
  type Query
  type Mutation
`;

const apollo = new ApolloServer({
  typeDefs: [typeDef, home.typeDef],
  resolvers: [home.resolvers],
  dataSources: () => {
    return {};
  },
  context: async ({ req }) => {
    return {};
  }
});

apollo.applyMiddleware({ app });

// Create the server
let server;
server = http.createServer(app);

server.listen({ port: config.port }, () =>
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
      apollo.graphqlPath
    }`
  )
);
