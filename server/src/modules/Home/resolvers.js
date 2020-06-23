const resolvers = {
  Mutation: {
    searchProducts: async (root, args, { dataSources }) => {
      try {
        const flipkartResults = await dataSources.productApi.getProductsFromFlipkart(
          args
        );

        const amazonResults = await dataSources.productApi.getProductsFromAmazon(
          args
        );

        return { flipkartResults, amazonResults };
      } catch (e) {
        return e;
      }
    }
  }
};

module.exports = resolvers;
