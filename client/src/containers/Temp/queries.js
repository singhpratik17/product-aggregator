import gql from 'graphql-tag';

/*
  Get user account
 */

export const GET_USER_ACCOUNT = gql`
    query UserAccount {
        userAccount {
            id
            name
            phone
            dob
        }
    }
`;
