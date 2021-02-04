import React from 'react';
import { Query } from '@apollo/client/react/components';

import Header from './header.component';

// GraphQL Operations
import { GET_CLIENT_PROPERTIES } from '../../apollo-client/queries';

const HeaderContainer = () => (
  <Query query={GET_CLIENT_PROPERTIES}>
    {({ data }) => (
      <Header currentUser={data.currentUser} isCartHidden={data.isCartHidden} />
    )}
  </Query>
);

export default HeaderContainer;
