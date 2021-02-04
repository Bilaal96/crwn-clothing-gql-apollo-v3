import React from 'react';
import { useQuery } from '@apollo/client';

import CartDropdown from './cart-dropdown.component';

// GraphQL Operations
import { GET_CART_ITEMS } from '../../apollo-client/queries';

// Gets toggleCartHidden() & cartItems and pass as props to CartDropdown
const CartDropdownContainer = () => {
  const { data } = useQuery(GET_CART_ITEMS);

  const { cartItems } = data;

  return <CartDropdown cartItems={cartItems} />;
};

export default CartDropdownContainer;
