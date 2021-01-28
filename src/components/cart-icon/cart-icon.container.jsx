import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import flowRight from 'lodash.flowright';

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
const CartIconContainer = ({ toggleCartHidden, data: { itemCount } }) => (
  <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
);

export default flowRight(
  graphql(GET_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer);
