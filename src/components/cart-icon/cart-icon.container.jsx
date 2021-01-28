import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

// Mutation - calls the toggleCartHidden Local Resolver
// Updates the isCartHidden value in the local cache
// Subsequent calls of toggleCartHidden mutation are resolved from the local cache
const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

// retrieve itemCount value from local cache
const GET_ITEM_COUNT = gql`
  query {
    itemCount @client
  }
`;

/**
 * Provide CartIcon with access to:
 * toggleCartHidden Mutation function
 * itemCount value from local cache
 */
const CartIconContainer = () => (
  <Query query={GET_ITEM_COUNT}>
    {({ data }) => (
      <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {(toggleCartHidden) => (
          <CartIcon
            toggleCartHidden={toggleCartHidden}
            itemCount={data.itemCount}
          />
        )}
      </Mutation>
    )}
  </Query>
);

export default CartIconContainer;
