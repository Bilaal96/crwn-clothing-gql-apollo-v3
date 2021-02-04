import React from 'react';
import { Query } from '@apollo/client/react/components';

import CartIcon from './cart-icon.component';

// GraphQL Operations
import { GET_ITEM_COUNT } from '../../apollo-client/queries';

// Provide CartIcon with access to itemCount value from local cache
const CartIconContainer = () => (
  <Query query={GET_ITEM_COUNT}>
    {({ data }) => <CartIcon itemCount={data.itemCount} />}
  </Query>
);

export default CartIconContainer;
