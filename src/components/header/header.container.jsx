import React from 'react';
import { Query, Mutation } from 'react-apollo';

import Header from './header.component';

import { GET_CLIENT_PROPERTIES } from '../../graphql/queries';
import { CLEAR_CART_ITEMS } from '../../graphql/mutations';

const HeaderContainer = () => (
  <Mutation mutation={CLEAR_CART_ITEMS}>
    {(clearCartItems) => (
      <Query query={GET_CLIENT_PROPERTIES}>
        {({ data }) => (
          <Header
            currentUser={data.currentUser}
            isCartHidden={data.isCartHidden}
            clearCartItems={clearCartItems}
          />
        )}
      </Query>
    )}
  </Mutation>
);

export default HeaderContainer;
