import React from 'react';
import { Query, Mutation } from 'react-apollo';

import CartDropdown from './cart-dropdown.component';

// GraphQL Operations
import { GET_CART_ITEMS } from '../../graphql/queries';
import { TOGGLE_CART_HIDDEN } from '../../graphql/mutations';

// Gets toggleCartHidden() & cartItems and pass as props to CartDropdown
const CartDropdownContainer = () => (
  <Mutation mutation={TOGGLE_CART_HIDDEN}>
    {(toggleCartHidden) => (
      <Query query={GET_CART_ITEMS}>
        {({ data }) => (
          <CartDropdown
            cartItems={data.cartItems}
            toggleCartHidden={toggleCartHidden}
          />
        )}
      </Query>
    )}
  </Mutation>
);

export default CartDropdownContainer;
