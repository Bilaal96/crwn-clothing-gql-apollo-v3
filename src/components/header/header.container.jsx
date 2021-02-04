import React from 'react';
import { useQuery } from '@apollo/client';

import Header from './header.component';

// GraphQL Operations
import { GET_CLIENT_PROPERTIES } from '../../apollo-client/queries';

const HeaderContainer = () => {
  const { data } = useQuery(GET_CLIENT_PROPERTIES);

  const { currentUser, isCartHidden } = data;

  return <Header currentUser={currentUser} isCartHidden={isCartHidden} />;
};

export default HeaderContainer;
