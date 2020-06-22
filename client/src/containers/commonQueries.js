
/*
  Get Country List
 */
export const GET_COUNTRY_LIST = gql`
  query Country {
    getCountries {
      id
      name
    }
  }
`;

/*
  Get Region List
 */
export const GET_REGION_LIST = gql`
  query Region($countryId: String!) {
    getRegionsByCountryId(countryId: $countryId) {
      id
      name
    }
  }
`;

/*
  User Login
 */
export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      accessToken
      refreshToken
      expiresIn
    }
  }
`;

/*
  User Logout
 */
export const LOGOUT = gql`
  query Logout($refreshToken: String!) {
    userLogout(refreshToken: $refreshToken)
  }
`;

/*
  User Organization Info
 */
export const USER_ORG_INFO = gql`
  query UserOrgInfo {
    userOrganizationInfo {
      id
      name
      countryId
      country
      regionId
      region
    }
  }
`;
