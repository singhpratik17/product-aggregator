const { RESTDataSource } = require('apollo-datasource-rest');
const cheerio = require('cheerio');

class ProductsApi extends RESTDataSource {
  constructor() {
    super();
    this.flipkartBase = `https://www.flipkart.com`;
  }

  async getProductsFromFlipkart({ searchText }) {
    try {
      const url = `${this.flipkartBase}/search?q=${searchText}`;
      const response = await this.get(url);
      const $ = cheerio.load(response);

      return $('._3O0U0u div div a')
        .map((i, element) => {
          const productUrl = `${this.flipkartBase}` + $(element).attr('href');
          // const imageUrl = $(element.children[0]).find('img').attr('src');
          const name = $(element.children[1])
            .find('._3wU53n')
            .text();
          const features = $(element.children[1]).find('li');
          const featuresList = $(features)
            .map((index, element) => {
              return $(element).text();
            })
            .get();

          const price = $(element.children[1])
            .find('._6BWGkk div')
            .children()
            .eq(0)
            .text();
          const originalPrice = $(element.children[1])
            .find('._6BWGkk div')
            .children()
            .eq(1)
            .text();
          const offerText = $(element.children[1])
            .find('._6BWGkk div')
            .children()
            .eq(2)
            .text();

          return {
            id: i,
            name,
            productUrl,
            featuresList,
            price,
            originalPrice,
            offerText
          };
        })
        .get();
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ProductsApi;
