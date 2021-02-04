import { gql } from '@apollo/client';

// ----- Server-side Queries -----
// --- Reusable GraphQL Fragments ---
export const CollectionDetails = gql`
  fragment CollectionDetails on Collection {
    id
    title
  }
`;

export const ItemDetails = gql`
  fragment ItemDetails on Item {
    id
    name
    price
    imageUrl
  }
`;

// --- Collection Related Queries ---
// TYPE: Query, FIELD: collections
export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections {
      ...CollectionDetails
      items {
        ...ItemDetails
      }
    }
  }
  ${CollectionDetails}
  ${ItemDetails}
`;

// TYPE: Query, FIELD: getCollectionsByTitle, VARIABLES: title:String
export const GET_COLLECTION_BY_TITLE = gql`
  query GetCollectionByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      ...CollectionDetails
      items {
        ...ItemDetails
      }
    }
  }
  ${CollectionDetails}
  ${ItemDetails}
`;

// ----- Client-side Queries to retrieve values from local cache -----
// --- Query Mutiple Cache Values ---
// returns currentUser & isCartHidden
export const GET_CLIENT_PROPERTIES = gql`
  query {
    currentUser @client
    isCartHidden @client
  }
`;

// returns cartItems & cartTotal
export const GET_CART_ITEMS_AND_TOTAL = gql`
  query {
    cartItems @client
    cartTotal @client
  }
`;

// --- User Related Queries ---
// currentUser
export const GET_CURRENT_USER = gql`
  query {
    currentUser @client
  }
`;

// --- Cart Related Queries ---
// isCartHidden
export const GET_CART_HIDDEN = gql`
  query {
    isCartHidden @client
  }
`;

// itemCount
export const GET_ITEM_COUNT = gql`
  query {
    itemCount @client
  }
`;

// cartTotal
export const GET_CART_TOTAL = gql`
  query {
    cartTotal @client
  }
`;

// cartItems
export const GET_CART_ITEMS = gql`
  query {
    cartItems @client
  }
`;
