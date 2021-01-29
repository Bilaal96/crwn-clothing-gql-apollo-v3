import { gql } from 'apollo-boost';

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  getCartItemCount,
  getCartTotal,
} from './cart.utils';

// Extend Backend Mutation Schema to include new type: ToggleCartHidden
// NOTE: type Mutation defines all possible mutation operations
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
    RemoveItemFromCart(item: Item!): [Item!]
    ClearItemFromCart(item: Item!): [Item!]
  }
`;

// Client-side Queries
// retrieve isCartHidden value from local cache
const GET_CART_HIDDEN = gql`
  query {
    isCartHidden @client
  }
`;

// retrieve itemCount value from local cache
const GET_ITEM_COUNT = gql`
  query {
    itemCount @client
  }
`;

// retrieve cartTotal value from local cache
const GET_CART_TOTAL = gql`
  query {
    cartTotal @client
  }
`;

// retrieve cartItems value from local cache
const GET_CART_ITEMS = gql`
  query {
    cartItems @client
  }
`;

const updateCartItemsRelatedQueries = (cache, newCartItems) => {
  // Calculate & cache new itemCount
  cache.writeQuery({
    query: GET_ITEM_COUNT,
    data: {
      itemCount: getCartItemCount(newCartItems),
    },
  });

  // Calculate & cache new cartTotal
  cache.writeQuery({
    query: GET_CART_TOTAL,
    data: {
      cartTotal: getCartTotal(newCartItems),
    },
  });

  // Update cartItems array in local cache => with newCartItems
  cache.writeQuery({
    query: GET_CART_ITEMS,
    data: {
      cartItems: newCartItems,
    },
  });
};

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      // Get isCartHidden value from local cache
      const { isCartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });

      // Toggle isCartHidden value & write new value to cache
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: {
          isCartHidden: !isCartHidden,
        },
      });

      return !isCartHidden;
    },
    addItemToCart: (_root, { item }, { cache }) => {
      // Get cartItems from local cache
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });

      // Add new item to cart => returns newCartItems array
      const newCartItems = addItemToCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },
    removeItemFromCart: (_root, { item }, { cache }) => {
      // Get cartItems from local cache
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });

      // Remove item from cart
      const newCartItems = removeItemFromCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },
    clearItemFromCart: (_root, { item }, { cache }) => {
      // Get cartItems from local cache
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });

      // Remove item from cart
      const newCartItems = clearItemFromCart(cartItems, item);

      updateCartItemsRelatedQueries(cache, newCartItems);

      return newCartItems;
    },
  },
};
