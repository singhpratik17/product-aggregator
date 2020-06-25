const resolvers = {
  query: {
    fetchProductDetails: async (root, args, { dataSources }) => {
      try {
        return await dataSources.productApi.fetchProductDetails(args);
      } catch (e) {
        return e;
      }
    }
  },
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
