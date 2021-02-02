import React from 'react';
import { Query } from '@apollo/client/react/components';

import CartDropdown from './cart-dropdown.component';

// GraphQL Operations
import { GET_CART_ITEMS } from '../../graphql/queries';

// Gets toggleCartHidden() & cartItems and pass as props to CartDropdown
const CartDropdownContainer = () => (
  <Query query={GET_CART_ITEMS}>
    {({ data }) => <CartDropdown cartItems={data.cartItems} />}
  </Query>
);
export default CartDropdownContainer;
