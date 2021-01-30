import React from 'react';
import { graphql } from 'react-apollo';
import flowRight from 'lodash.flowright';

import CheckoutItem from './checkout-item.component';

// GraphQL Operations
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_ITEM_FROM_CART,
} from '../../graphql/mutations';

const CheckoutItemContainer = ({
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  ...otherProps
}) => (
  <CheckoutItem
    addItem={(item) => addItemToCart({ variables: { item } })}
    removeItem={(item) => removeItemFromCart({ variables: { item } })}
    clearItem={(item) => clearItemFromCart({ variables: { item } })}
    {...otherProps}
  />
);

export default flowRight(
  graphql(ADD_ITEM_TO_CART, { name: 'addItemToCart' }),
  graphql(REMOVE_ITEM_FROM_CART, { name: 'removeItemFromCart' }),
  graphql(CLEAR_ITEM_FROM_CART, { name: 'clearItemFromCart' })
)(CheckoutItemContainer);
