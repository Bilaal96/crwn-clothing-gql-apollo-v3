import React from 'react';
import { Query } from 'react-apollo';

import CheckoutPage from './checkout.component';

// GraphQL Operations
import { GET_CART_ITEMS_AND_TOTAL } from '../../graphql/queries';

const CheckoutPageContainer = () => (
  <Query query={GET_CART_ITEMS_AND_TOTAL}>
    {({ data }) => (
      <CheckoutPage cartItems={data.cartItems} total={data.cartTotal} />
    )}
  </Query>
);

export default CheckoutPageContainer;
