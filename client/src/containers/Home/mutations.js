import gql from 'graphql-tag';

export const SEARCH_PRODUCTS = gql`
  mutation Home($searchText: String!) {
    searchProducts(searchText: $searchText) {
      flipkartResults {
        id
        name
        productUrl
        price
        originalPrice
      }
      amazonResults {
        id
        name
        productUrl
        price
        originalPrice
        imgUrl
      }
    }
  }
`;
