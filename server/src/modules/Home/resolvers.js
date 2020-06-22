const resolvers = {
  Mutation: {
    searchProducts: async (root, args, { dataSources }) => {
      try {
        const flipkartResults = await dataSources.productApi.getProductsFromFlipkart(
          args
        );

        return { flipkartResults };
      } catch (e) {
        return e;
      }
    }
  }
};

module.exports = resolvers;
