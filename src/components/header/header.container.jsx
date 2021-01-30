import React from 'react';
import { Query } from 'react-apollo';

import Header from './header.component';

import { GET_CLIENT_PROPERTIES } from '../../graphql/queries';

const HeaderContainer = () => (
  <Query query={GET_CLIENT_PROPERTIES}>
    {({ data }) => (
      <Header currentUser={data.currentUser} isCartHidden={data.isCartHidden} />
    )}
  </Query>
);

export default HeaderContainer;
