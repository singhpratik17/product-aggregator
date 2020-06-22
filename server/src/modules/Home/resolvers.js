const resolvers = {
  Mutation: {
    searchProducts: async (root, args, { dataSources }) => {
      try {
        const flipkartResults = await dataSources.productApi.getProductsFromFlipkart(
          args
        );

        console.log(flipkartResults);
        return {};
      } catch (e) {
        return e;
      }
    }
  }
};

module.exports = resolvers;
