// Reactive Vars - Local Cart State
// NOTE: the term "Local Cart State" refers to --> the values of the Reactive Vars related to cartItems
import {
  cartItemsVar,
  cartTotalVar,
  itemCountVar,
} from '../apollo-client/cache';

// NOTE: LS is an abbreviation for Local Storage

// Set Local Cart State in LS
// -- used in cart util: updateLocalCartState()
export const setLocalCartStateInLS = (cartItems, cartTotal, itemCount) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
  localStorage.setItem('itemCount', JSON.stringify(itemCount));
};

// Get Local Cart State from LS => returns object
export const getLocalCartStateFromLS = () => ({
  cartItems: JSON.parse(localStorage.getItem('cartItems')),
  cartTotal: JSON.parse(localStorage.getItem('cartTotal')),
  itemCount: JSON.parse(localStorage.getItem('itemCount')),
});

// Clear Local Cart State from from LS
// -- used in Header component: on sign-out-btn click event
export const clearLocalCartStateFromLS = () => {
  localStorage.removeItem('cartItems');
  localStorage.removeItem('cartTotal');
  localStorage.removeItem('itemCount');
};

/** persistLocalCartStateToLS()
 * Use LS to determine whether to:
 *   pull existing cart-related values from LS
 
 * OR if LS has not been set
 *   set cart-related values in LS using Local Cart State
 
 * Called before instantiated ApolloClient in index.js  
*/
export const persistLocalCartStateToLS = () => {
  // Get Local Cart State from LS
  const { cartItems, cartTotal, itemCount } = getLocalCartStateFromLS();

  // Check if all LS values retrieved exist
  // i.e. are the values: defined or null
  if (cartItems && cartTotal && itemCount) {
    // All LS values are defined
    // Set Reactive Vars with values from LS
    cartItemsVar(cartItems);
    cartTotalVar(cartTotal);
    itemCountVar(itemCount);
  } else {
    // One or more LS values retrieved are null
    // i.e. have not been set
    // Set / initialise LS with Local Cart State
    setLocalCartStateInLS(cartItemsVar(), cartTotalVar(), itemCountVar());
  }
};
