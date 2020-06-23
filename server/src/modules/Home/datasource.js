const { RESTDataSource } = require('apollo-datasource-rest');
const cheerio = require('cheerio');

class ProductsApi extends RESTDataSource {
  constructor() {
    super();
    this.flipkartBaseUrl = `https://www.flipkart.com`;
    this.amazonBaseUrl = `https://www.amazon.in`;
  }

  willSendRequest(request) {
    request.headers.set(
      'User-Agent',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
    );
  }

  async getProductsFromFlipkart({ searchText }) {
    try {
      const url = `${this.flipkartBaseUrl}/search?q=${searchText}`;
      const response = await this.get(url);
      const $ = cheerio.load(response);

      if ($('div').hasClass('_3liAhj')) {
        return $('._3liAhj')
          .map((i, element) => {
            const productUrl =
              `${this.flipkartBaseUrl}` + $(element.children[0]).attr('href');

            const name = $(element.children[1]).text();

            const price = $(element.children[4])
              .find('._1Vfi6u div')
              .children()
              .eq(0)
              .text();

            const originalPrice = $(element.children[4])
              .find('._1Vfi6u div')
              .children()
              .eq(1)
              .text();

            return {
              id: `${i}-Flip`,
              name,
              productUrl,
              price,
              originalPrice
            };
          })
          .get();
      } else {
        return $('._3O0U0u a')
          .map((i, element) => {
            const productUrl =
              `${this.flipkartBaseUrl}` + $(element).attr('href');

            // Getting a placeholder url.
            // const imageUrl = $(element.children[0]).find('._1Nyybr');
            // console.log(i, imageUrl);

            const name = $(element.children[1])
              .find('._3wU53n')
              .text();

            // Not required.
            // const features = $(element.children[1]).find('li');
            // const featuresList = $(features)
            //   .map((index, element) => {
            //     return $(element).text();
            //   })
            //   .get();

            // const offerText = $(element.children[1])
            //   .find('._6BWGkk div')
            //   .children()
            //   .eq(2)
            //   .text();

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

            return {
              id: `${i}-Flip`,
              name,
              productUrl,
              price,
              originalPrice
            };
          })
          .get();
      }
    } catch (e) {
      throw e;
    }
  }

  async getProductsFromAmazon({ searchText }) {
    try {
      const url = `${this.amazonBaseUrl}/search/s?k=${searchText}`;
      const response = await this.get(url, {}, {});
      const $ = cheerio.load(response);

      return $('.s-result-item')
        .find('.celwidget div .a-section')
        .has('.a-section')
        .not('.a-spacing-none')
        .map((i, element) => {
          const imgUrl = $(element)
            .find('img')
            .attr('src');

          const name = $(element)
            .find('h2 a span')
            .text();

          const productUrl = $(element)
            .find('h2 a')
            .attr('href');

          const price = $(element)
            .find('.a-price-whole')
            .text();

          const originalPrice = $(element)
            .find('.a-text-price .a-offscreen')
            .text();

          return {
            id: `${i}-Amz`,
            name,
            imgUrl,
            price: `₹${price}`,
            originalPrice,
            productUrl: `${this.amazonBaseUrl}${productUrl}`
          };
        })
        .get();
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ProductsApi;
