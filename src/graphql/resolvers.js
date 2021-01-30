import { gql } from 'apollo-boost';

// Cart Utility Functions
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  getCartItemCount,
  getCartTotal,
} from './cart.utils';

// Client Side Queries
import {
  GET_CART_HIDDEN,
  GET_ITEM_COUNT,
  GET_CART_TOTAL,
  GET_CART_ITEMS,
  GET_CURRENT_USER,
} from './queries';

/** Type Definitions
 * extend Item type to include quantity field
 
 * Define Client-side Types:
  - User
  - DateTime 

 * extend Mutation type to define all possible mutations; including:
  - For Cart: ToggleCartHidden, AddItemToCart, RemoveItemFromCart, ClearItemFromCart
  - For User: SetCurrentUser
 */
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type DateTime {
    seconds: Int!
    nanoseconds: Int!
  }

  extend type User {
    id: ID!
    displayName: String!
    email: String!
    createdAt: DateTime!
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
    RemoveItemFromCart(item: Item!): [Item]!
    ClearItemFromCart(item: Item!): [Item]!
    ClearCartItems: [Item]!
    SetCurrentUser(user: User!): User
  }
`;

// Update Local Cache after modifying cartItems Array
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

// Local Mutation Resolvers
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
    clearCartItems: (_root, _args, { cache }) => {
      updateCartItemsRelatedQueries(cache, []);
    },
    setCurrentUser: (_root, { user }, { cache }) => {
      // Update currentUser local cache value
      cache.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          currentUser: user,
        },
      });

      return user;
    },
  },
};
