import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CartDropdown from './cart-dropdown.component';

// Retrieves toggleCartHidden() Mutation Resolver
const TOGGLE_CART_HIDDEN = gql`
  mutation toggleCartHidden {
    toggleCartHidden @client
  }
`;

// Retrieves cartItems value from local cache
const GET_CART_ITEMS = gql`
  query {
    cartItems @client
  }
`;

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
