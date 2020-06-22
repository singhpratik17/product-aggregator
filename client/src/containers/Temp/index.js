import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER_ACCOUNT } from './queries';

const Temp = () => {
  const { loading, data, error } = useQuery(GET_USER_ACCOUNT);
  return !loading && !error ? <>{JSON.stringify(data.userAccount)}</> : <></>;
};

export default Temp;
