import React from 'react';
import flowRight from 'lodash.flowright';
import { graphql } from 'react-apollo';

import CartIcon from './cart-icon.component';

// GraphQL Operations
import { GET_ITEM_COUNT } from '../../graphql/queries';
import { TOGGLE_CART_HIDDEN } from '../../graphql/mutations';

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
