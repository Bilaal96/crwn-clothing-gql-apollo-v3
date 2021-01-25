import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Header from './header.component';

// Client-side Query: retrieves isCartHidden value from local cache
const GET_CART_HIDDEN = gql`
  query {
    isCartHidden @client
  }
`;

const HeaderContainer = () => {
  return (
    <Query query={GET_CART_HIDDEN}>
      {({ data }) => <Header isCartHidden={data.isCartHidden} />}
    </Query>
  );
};

export default HeaderContainer;
