import React from 'react';
import { useQuery } from '@apollo/client';

import CartIcon from './cart-icon.component';

// GraphQL Operations
import { GET_ITEM_COUNT } from '../../apollo-client/queries';

// Provide CartIcon with access to itemCount value from local cache
const CartIconContainer = () => {
  const { data } = useQuery(GET_ITEM_COUNT);

  const { itemCount } = data;

  return <CartIcon itemCount={itemCount} />;
};

export default CartIconContainer;
