import gql from 'graphql-tag';

export const FETCH_PRODUCT_DETAILS = gql`
    query Home($url: String!) {
        fetchProductDetails(url: $url) {
            features
        }
    }
`;
