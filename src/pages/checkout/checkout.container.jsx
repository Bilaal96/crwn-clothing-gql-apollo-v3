import React from 'react';
import { useQuery } from '@apollo/client';

import CheckoutPage from './checkout.component';

// GraphQL Operations
import { GET_CART_ITEMS_AND_TOTAL } from '../../apollo-client/queries';

const CheckoutPageContainer = () => {
  const { data } = useQuery(GET_CART_ITEMS_AND_TOTAL);

  const { cartItems, cartTotal } = data;

  return <CheckoutPage cartItems={cartItems} total={cartTotal} />;
};

export default CheckoutPageContainer;
