// Reactive Vars
import {
  isCartHiddenVar,
  cartItemsVar,
  cartTotalVar,
  itemCountVar,
} from '../apollo-client/cache';

// Local Storage Utils
import { setLocalCartStateInLS } from './local-storage.utils';

// ----- Utils: Calculate Values For cartTotal & itemCount -----
export const calculateCartTotal = (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  );

export const calculateCartItemCount = (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  );

// ----- Utils: Updating Reactive Vars Related To Cart -----
// Toggle isCartHidden boolean
export const toggleCartHidden = () => {
  isCartHiddenVar(!isCartHiddenVar());
};

/** 
 * --- updateLocalCartState() ---
 * Updates Reactive Vars related to Cart 
 * @param {updated array of cart items} cartItems 
 
 * Uses cartItems to calculate new cartTotal & itemCount values
 
 * Updated Reactive Vars with cartItems and calculated values
 * Sets cartItems & calculated values in Local Storage
*/
const updateLocalCartState = (cartItems) => {
  // Calculate new itemCount & cartTotal values
  const newCartTotal = calculateCartTotal(cartItems);
  const newItemCount = calculateCartItemCount(cartItems);

  // Update Reactive Variables with calculated values
  cartItemsVar(cartItems);
  cartTotalVar(newCartTotal);
  itemCountVar(newItemCount);

  // Set Local Cart State in local storage
  setLocalCartStateInLS(cartItems, newCartTotal, newItemCount);

  return cartItems;
};

// --- Add Item To Cart ---
export const addItemToCart = (cartItemToAdd) => {
  // Get cartItems
  const cartItems = cartItemsVar();

  // Check if cartItemToAdd exists in cartItems
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  // Increase quantity if cartItemToAdd already exists in cartItems Array
  if (existingCartItem) {
    const newCartItems = cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

    return updateLocalCartState(newCartItems);
  }

  // For non-existant items, add cartItemToAdd to cartItems array with quanity of 1
  const newCartItems = [...cartItems, { ...cartItemToAdd, quantity: 1 }];

  return updateLocalCartState(newCartItems);
};

// --- Remove Single Item From Cart ---
export const removeItemFromCart = (cartItemToRemove) => {
  // Get cartItems
  const cartItems = cartItemsVar();

  // Check if cartItemToAdd exists in cartItems
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // If item quantity equals 1, clear the item from the cart
  if (existingCartItem.quantity === 1) {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== cartItemToRemove.id
    );

    return updateLocalCartState(newCartItems);
  }

  // If item quanity > 1, subtract 1 from quantity
  const newCartItems = cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );

  return updateLocalCartState(newCartItems);
};

// --- Clear Single Item From Cart ---
// regardless of quantity value
export const clearItemFromCart = (cartItemToClear) => {
  const cartItems = cartItemsVar();

  const newCartItems = cartItems.filter(
    (cartItem) => cartItem.id !== cartItemToClear.id
  );

  return updateLocalCartState(newCartItems);
};

// --- Clears All cartItems From Cart ---
export const clearAllCartItems = () => {
  updateLocalCartState([]);
};
