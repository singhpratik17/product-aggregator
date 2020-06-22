const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const http = require('http');

require('dotenv').config({
  path: './../.env'
});

/*
  All api modules here
 */
const temp = require('./modules/Temp');

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
`;

const apollo = new ApolloServer({
  typeDefs: [typeDef, temp.typeDef],
  resolvers: [temp.resolvers],
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
