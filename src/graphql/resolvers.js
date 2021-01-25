import { gql } from 'apollo-boost';

// extend Mutation Schema to include new type: ToggleCartHidden
export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
  }
`;

// Client-side Query: retrieves isCartHidden value from local cache
const GET_CART_HIDDEN = gql`
  query {
    isCartHidden @client
  }
`;

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }, _info) => {
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
  },
};
