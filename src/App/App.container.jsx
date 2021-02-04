import React from 'react';
import { useQuery } from '@apollo/client';

import App from './App';

// GraphQL Operations
import { GET_CURRENT_USER } from '../apollo-client/queries';

const AppContainer = () => {
  const { data } = useQuery(GET_CURRENT_USER);

  const { currentUser } = data;

  return <App currentUser={currentUser} />;
};

export default AppContainer;
