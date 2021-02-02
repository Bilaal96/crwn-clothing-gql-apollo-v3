import React from 'react';
import { Mutation } from '@apollo/client/react/components';

import CollectionItem from './collection-item.component';

// GraphQL Operations
import { ADD_ITEM_TO_CART } from '../../graphql/mutations';

const CollectionItemContainer = (props) => (
  <Mutation mutation={ADD_ITEM_TO_CART}>
    {(addItemToCart) => (
      <CollectionItem
        {...props}
        addItem={(item) => addItemToCart({ variables: { item } })}
      />
    )}
  </Mutation>
);

export default CollectionItemContainer;
