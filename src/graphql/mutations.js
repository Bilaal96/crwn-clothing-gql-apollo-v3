import { gql } from 'apollo-boost';

/**
 * Client-side Mutations to modify values in local cache
 * Mutations check the Cache to see if there is a corresponding Local Resolver of the same name
 * e.g. setCurrentUser Mutation field calls the setCurrentUser() Local Resolver
 */
// --- User Related Mutations ---
// Set cache value: currentUser
export const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;

// --- Cart Related Mutations ---
// Toggle isCartHidden (Boolean)
export const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($item: Item!) {
    removeItemFromCart(item: $item) @client
  }
`;

export const CLEAR_ITEM_FROM_CART = gql`
  mutation ClearItemFromCart($item: Item!) {
    clearItemFromCart(item: $item) @client
  }
`;

export const CLEAR_CART_ITEMS = gql`
  mutation ClearCartItems {
    clearCartItems @client
  }
`;
