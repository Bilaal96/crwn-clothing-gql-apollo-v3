import { InMemoryCache, makeVar } from '@apollo/client';

/** Cache with Field Policies 
 * Field policies allow us to define local fields
 * When queried, local fields with a read() function return the value of corresponding field
 
 * Within the read() function we can return Reactive Variables 
 * With this method, a local field is queried, it returns the value of the Reactive Var
 */
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isCartHidden: {
          read() {
            return isCartHiddenVar();
          },
        },
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
        cartTotal: {
          read() {
            return cartTotalVar();
          },
        },
        itemCount: {
          read() {
            return itemCountVar();
          },
        },
        currentUser: {
          read() {
            return currentUserVar();
          },
        },
      },
    },
  },
});

/**
 * Initialise Reactive Variables (RVs)
 * When called without argument => returns value
 * When called with argument => stores argument as value
 
 * The cache is aware of changes to RVs
 * Any operations dependent on an RV is refreshed
 * This ensures that when state / props derived from RVs changes, the corresponding React components rerender 
 */
export const isCartHiddenVar = makeVar(true);
export const cartItemsVar = makeVar([]);
export const cartTotalVar = makeVar(0);
export const itemCountVar = makeVar(0);
export const currentUserVar = makeVar(null);
