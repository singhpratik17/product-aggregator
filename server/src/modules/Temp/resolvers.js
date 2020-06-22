const { users } = require('./mockData');

const resolvers = {
  Query: {
    // get user info
    userAccount: async (root, args, context) => {
      return users[0];
    }
  }
};

module.exports = resolvers;
